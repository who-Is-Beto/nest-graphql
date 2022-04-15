import { Pet } from './pet.entity';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Query } from '@nestjs/graphql';
import { CreatePetInput } from './dto/createPetInput.dto';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => [Pet])
  public async pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Mutation((returns) => Pet)
  public async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    const myPet = await this.petService.createPet(createPetInput);
    return myPet;
  }

  @Query((returns) => Pet)
  public async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Pet> {
    return this.petService.findOne(id);
  }
}
