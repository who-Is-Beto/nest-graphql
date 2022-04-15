import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPetInput.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  public async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = await this.petsRepository.create(createPetInput);

    return this.petsRepository.save(newPet);
  }

  public async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find(); // SELECT * pet
  }

  public async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneOrFail({
      where: { id },
    }); // SELECT * pet WHERE id = id
  }
}
