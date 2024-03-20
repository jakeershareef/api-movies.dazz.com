import { userSchema } from 'src/models/userModel';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { MovieApisService } from './movie-apis.service';
import { ADD_MOVIE, ADMIN_USER, DELETE_MOVIE, FETCH_MOVIES, MOVIES_UPDATE, SOMETHING_WRONG, USER_NOT_ADD, USER_NOT_DELETE, USER_NOT_UPDATE } from 'src/constants/messageConstant';
import { AuthGuard } from 'src/guards/authGuard';
import { FilterHelper } from 'src/helpers/filterHelper';
import { PaginationHelper } from 'src/helpers/paginationHelper';

@UseGuards(AuthGuard)
@Controller()
export class MovieApisController {
  constructor(
    private readonly movieApisService: MovieApisService,
    private readonly filterHelper: FilterHelper,
    private readonly paginationHelper: PaginationHelper,
  ) { }

  @Post('/movies')
  public async createMovies(@Req() req: any, @Res() res: any) {
    try {

      let data = req.body;
      let user = req.user
      data.user_id = user._id
      console.log(user.user_type)
      if (!user || user.user_type !== ADMIN_USER) {
        return res.status(400).json({
          success: false,
          message: USER_NOT_ADD
        });
      }
      let saveMovie = await this.movieApisService.createMovie(data);

      return res.status(200).json({
        success: true,
        message: ADD_MOVIE,
        data: saveMovie
      })
    }
    catch (err) {
      return res.status(200).json({
        success: false,
        message: SOMETHING_WRONG
      })
    }
  }

  @Get('/movies')
  public async listAllMovies(@Req() req: any, @Res() res: any) {
    try {

      let page = req.query.page || 1;
      let limit = req.query.limit || 100;
      let orderBy = req.query.order_by || "date";
      let orderType = req.query.order_type || "desc";

      let skip = (page - 1) * limit;

      const sort = {
        [orderBy]: orderType
      }

      let query = this.filterHelper.movies(req.query)

      const [movies, count]: any = await Promise.all([
        await this.movieApisService.getMovies({ query, skip, limit, sort }),
        await this.movieApisService.countMovies(query)
      ])
      const response = this.paginationHelper.getPaginationResponse({
        page: +req.query.page || 1,
        count,
        limit,
        skip,
        data: movies,
        message: FETCH_MOVIES,
        searchString: req.query.search_string,
      });

      return res.status(200).json(response);

    }
    catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: SOMETHING_WRONG
      })
    }
  }

  @Patch('/movies/:id')
  async updateMovies(@Req() req: any, @Res() res: any) {
    try {
      let movieId = req.params.id;
      let data = req.body;
      data.user_id = req.user._id;
      let user = req.user
      let query = {
        _id: movieId
      }
      if (!user || user.user_type !== ADMIN_USER) {
        return res.status(400).json({
          success: false,
          message: USER_NOT_UPDATE
        });
      }
      await this.movieApisService.updateMovies(query, data)
      return res.status(200).json({
        success: true,
        message: MOVIES_UPDATE
      })
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: SOMETHING_WRONG
      })
    }
  }

  @Delete('movies/:id')
  async deleteMovies(@Req() req: any, @Res() res: any) {
    try {
      let movieId = req.params.id;
      let user = req.user

      let query = {
        _id: movieId
      }

      if (!user || user.user_type !== ADMIN_USER) {
        return res.status(400).json({
          success: false,
          message: USER_NOT_DELETE
        });
      }
      let deletedMovie = await this.movieApisService.deleteMovie(query);
      return res.status(200).json({
        success: false,
        message: DELETE_MOVIE,
        data: deletedMovie
      })
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: SOMETHING_WRONG
      })
    }
  }
}
