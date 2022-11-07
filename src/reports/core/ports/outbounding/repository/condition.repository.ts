import { Condition } from "../../../domain/condition";

export interface IConditionRepository {
    findConditions(): Promise<Condition[]>;
    findConditionById(id: string): Promise<Condition>;
}