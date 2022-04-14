import { Pet } from './pet.entity';
import { Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Query } from '@nestjs/graphql';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => [Pet])
  public async pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }
}
