import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['setItem', 'getItem', 'removeItem', 'clear']);

    Object.defineProperty(window, 'localStorage', { value: localStorageSpy });
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('save', () => {
    it('should save data to localStorage', () => {
      const testData = { test: 'data' };
      service.save('testKey', testData);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(testData));
    });

    it('should throw error when localStorage.setItem fails', () => {
      localStorageSpy.setItem.and.throwError('Storage error');
      expect(() => service.save('testKey', 'data')).toThrowError('Failed to save data to localStorage');
    });
  });

  describe('get', () => {
    it('should retrieve data from localStorage', () => {
      const testData = { test: 'data' };
      localStorageSpy.getItem.and.returnValue(JSON.stringify(testData));
      const result = service.get('testKey');
      expect(result).toEqual(testData);
      expect(localStorageSpy.getItem).toHaveBeenCalledWith('testKey');
    });

    it('should return null when key does not exist', () => {
      localStorageSpy.getItem.and.returnValue(null);
      const result = service.get('nonexistentKey');
      expect(result).toBeNull();
    });

    it('should throw error when localStorage.getItem fails', () => {
      localStorageSpy.getItem.and.throwError('Storage error');
      expect(() => service.get('testKey')).toThrowError('Failed to retrieve data from localStorage');
    });
  });

  describe('remove', () => {
    it('should remove item from localStorage', () => {
      service.remove('testKey');
      expect(localStorageSpy.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should throw error when localStorage.removeItem fails', () => {
      localStorageSpy.removeItem.and.throwError('Storage error');
      expect(() => service.remove('testKey')).toThrowError('Failed to remove data from localStorage');
    });
  });

  describe('clear', () => {
    it('should clear all items from localStorage', () => {
      service.clear();
      expect(localStorageSpy.clear).toHaveBeenCalled();
    });

    it('should throw error when localStorage.clear fails', () => {
      localStorageSpy.clear.and.throwError('Storage error');
      expect(() => service.clear()).toThrowError('Failed to clear localStorage');
    });
  });
});
