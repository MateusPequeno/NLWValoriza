import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from 'class-transformer';
class ListTagsService{
  async execute(){
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();
    //Após fazer a busca ele vai em tag e cria novos objetos, add o nameCustom
    return classToPlain(tags);
  }
} 
export { ListTagsService }