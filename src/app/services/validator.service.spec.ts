import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  describe('atLeastOneSelected', () => {
    it('should return null when at least one value is true', () => {
      const control = new FormControl([false, true, false]);
      const result = service.atLeastOneSelected(control);
      expect(result).toBeNull();
    });

    it('should return error when all values are false', () => {
      const control = new FormControl([false, false, false]);
      const result = service.atLeastOneSelected(control);
      expect(result).toEqual({ noItemSelected: true });
    });

    it('should return error for empty array', () => {
      const control = new FormControl([]);
      const result = service.atLeastOneSelected(control);
      expect(result).toEqual({ noItemSelected: true });
    });
  });

  describe('notDuplicateItem', () => {
    it('should return null when no duplicates exist', () => {
      const control = new FormControl(['apple', 'banana', 'orange']);
      const result = service.notDuplicateItem(control);
      expect(result).toBeNull();
    });

    it('should return error when duplicates exist', () => {
      const control = new FormControl(['apple', 'banana', 'apple']);
      const result = service.notDuplicateItem(control);
      expect(result).toEqual({ duplicateItem: true });
    });

    it('should return null for empty array', () => {
      const control = new FormControl([]);
      const result = service.notDuplicateItem(control);
      expect(result).toBeNull();
    });
  });
});
