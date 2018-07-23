
import BaseRepository from "../repositories/base-repository";
import {User} from '../models/index';
export default class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}
}