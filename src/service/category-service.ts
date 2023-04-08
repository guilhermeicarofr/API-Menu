import fs from 'fs';
import { ICategory } from 'model/ICategory';

import { CategoryRepository } from 'repository/category-repository';

export class CategoryService {
  private repository;
  
  constructor() {
    this.repository = new CategoryRepository();
  }

  private loadCategories() {
    const json = fs.readFileSync('./assets/categories.json', 'utf8');
    return JSON.parse(json);
  }

  private async seedCategories() {
    const categories = this.loadCategories();
    const { primary } = categories as { primary: ICategory[] };

    for(const category of primary) {
      const createdId = await this.repository.create(category);
      const createdCategory = await this.repository.findById(createdId.id);

      const subCategories = categories[createdCategory.name];
      for(const sub of subCategories) {
        await this.repository.create({ name: sub.name, parent: createdCategory })
      }
    }
  }

  async listCategories() {
    let categories = await this.repository.findAll();
    if(!categories.length) {
      await this.seedCategories();
      categories = await this.repository.findAll();
    }
    return categories;
  }
}
