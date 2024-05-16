import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe, singleSampleRecipe } from '../../architecture/utils/interfaces';
import { of } from 'rxjs';

describe('RecipeService', () => {
  let service: RecipeService;
  let _http: HttpClient;

  const mockRecipeDetails: Recipe = singleSampleRecipe;
  const mockResponse = {
    message: "Successful Api call",
  };

  const params = new HttpParams()
    .set('testParams', "testParams");

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        {
          provide: HttpClient,
          useValue: {
            post: jest.fn(() => of(mockResponse)),
            put: jest.fn(() => of(mockResponse)),
            get: jest.fn(() => of(mockResponse)),
            delete: jest.fn(() => of(mockResponse)),
          },
        }
      ],
    });
    service = TestBed.inject(RecipeService);
    _http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /********* Posting a new recipe */
  it('Should return an Observable with a successful message on successful recipe posting', () => {
    const postNewRecipe$ = service.postNewRecipe(mockRecipeDetails);

    postNewRecipe$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.post with the correct URL and data', () => {
    service.postNewRecipe(mockRecipeDetails);

    expect(_http.post).toHaveBeenCalledWith(
      `${service.serverUrl}/post`,
      mockRecipeDetails
    );
  });

  /********** Fetching All Recipes */


  describe("Fetch All", () => {
    it('Should return an Observable with a successful message on successfully fetching all recipes', () => {
      const fetchAllRecipes$ = service.fetchAllRecipes();

      fetchAllRecipes$.subscribe(res => {
        expect(res).toEqual(mockResponse); //Expect successful response
      })
    });

    it('Should call HttpClient.get with the correct URL and data', () => {
      service.fetchAllRecipes();

      expect(_http.get).toHaveBeenCalledWith(
        `${service.serverUrl}/get/all`,
      );
    });
  })


  /********* Fetching new recipes */
  it('Should return an Observable with a successful message on successfully getting favorite recipes', () => {
    const fetchFavRecipes$ = service.fetchFavRecipes();

    fetchFavRecipes$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.get with the correct URL and data', () => {
    service.fetchFavRecipes();

    expect(_http.get).toHaveBeenCalledWith(
      `${service.serverUrl}/get/favRecipes`,
    );
  });

  /******************** Fetching New Recipes */
  it('Should return an Observable with a successful message on successfully fetching new recipes', () => {
    const fetchNewRecipes$ = service.fetchNewRecipes();

    fetchNewRecipes$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.get with the correct URL and data', () => {
    service.fetchNewRecipes();

    expect(_http.get).toHaveBeenCalledWith(
      `${service.serverUrl}/get/newRecipes`,
    );
  });

  /****************** Fetch my recipes */
  it('Should return an Observable with a successful message on successfully fetching my recipes', () => {
    const fetchMyRecipes$ = service.fetchMyRecipes();

    fetchMyRecipes$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.get with the correct URL and data', () => {
    service.fetchNewRecipes();

    expect(_http.get).toHaveBeenCalledWith(
      `${service.serverUrl}/get/newRecipes`,
    );
  });

  /****************** Search Recipes by ID */
  it('Should return an Observable with a successful message on successfully searching by ID', () => {
    const searchRecipeById$ = service.searchRecipeById(params);

    searchRecipeById$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.get with the correct URL and data', () => {
    service.searchRecipeById(params);

    expect(_http.get).toHaveBeenCalledWith(
      `${service.serverUrl}/get/id`,
      { params: params }
    );
  });


  /*****************Updating a recipe */
  it('Should return an Observable with a successful message on successful update', () => {
    const updateRecipe$ = service.updateRecipe(mockRecipeDetails);

    updateRecipe$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.put with the correct URL and data', () => {
    service.updateRecipe(mockRecipeDetails);

    expect(_http.put).toHaveBeenCalledWith(
      `${service.serverUrl}/update`,
      mockRecipeDetails
    );
  });

  /**************Deleting a recipe */
  it('Should return an Observable with a successful message on successfully deleting a recipe', () => {
    const deleteRecipe$ = service.searchRecipeById(mockRecipeDetails);

    deleteRecipe$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.delete with the correct URL and data', () => {
    service.deleteRecipe(mockRecipeDetails);

    expect(_http.delete).toHaveBeenCalledWith(
      `${service.serverUrl}/delete`,
      {body: mockRecipeDetails}
    );
  }); 

  /**************** Favoriting a recipe */
  it('Should return an Observable with a successful message on successful favaoriting a recipe', () => {
    const favoriteRecipe$ = service.favoriteRecipe(params);

    favoriteRecipe$.subscribe(res => {
      expect(res).toEqual(mockResponse); //Expect successful response
    })
  });

  it('Should call HttpClient.put with the correct URL and data', () => {
    service.searchRecipeById(params);

    expect(_http.get).toHaveBeenCalledWith(
      `${service.serverUrl}/get/id`,
      { params: params }
    );
  }); 

});
