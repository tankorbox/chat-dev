
import BaseRepository from "../repositories/base-repository";
import {UserGroup} from '../models/index';
export default class UserGroupRepository extends BaseRepository {
	constructor() {
		super(UserGroup);
	}
}