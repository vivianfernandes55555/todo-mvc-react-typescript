import { todoValueType } from "../../../types/todo.type";
import { todoAction, addToTodoList } from './todo.action';

describe('Todo Actions', () => {

    it('ADD_TO_TODO_LIST returns an action of the expected shape', () => {
        const todoStoreData: todoValueType[] = [{
            text: "need to go for lunch",
            isCompleted: false,
            isChecked: false,
          },
          {
            text: "need to call Susan",
            isCompleted: false,
            isChecked: false,
          },
          {
            text: "keep the books in the cupboard",
            isCompleted: false,
            isChecked: false,
          },
          {
            text: "call Larry after lunch",
            isCompleted: true,
            isChecked: true,
          }
          ];

        const response: todoValueType[] = todoStoreData;

        const expectedAction = {
            payload: todoStoreData,
            type: todoAction.ADD_TO_TODO_LIST
        }
        expect(addToTodoList(response)).toEqual(expectedAction);
    });
})


