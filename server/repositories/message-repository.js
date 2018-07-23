
import BaseRepository from "../repositories/base-repository";
import {Message} from '../models/index';
export default class MessageRepository extends BaseRepository {
	constructor() {
		super(Message);
	}
}