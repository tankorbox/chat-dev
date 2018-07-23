

import BaseRepository from "./base-repository";
import {Group} from '../models/index';

export default class GroupRepository extends BaseRepository {
	constructor() {
		super(Group)
	}
}