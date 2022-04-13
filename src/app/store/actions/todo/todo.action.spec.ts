import { todoType } from "../../../types/todo.type";
import { todoAction, addToTodoList, tabTypes, setActiveTab, setAllTodoCompleted } from './todo.action';

describe('Todo Actions', () => {

    it('ADD_TO_TODO_LIST returns an action of the expected shape', () => {
        const todoStoreData: todoType[] = [{
            id:"1",
            text: "need to go for lunch",
            isCompleted: false,
            isChecked: false,
          },
          {
            id:"2",
            text: "need to call Susan",
            isCompleted: false,
            isChecked: false,
          },
          {
            id:"3",
            text: "keep the books in the cupboard",
            isCompleted: false,
            isChecked: false,
          },
          {
            id:"4",
            text: "call Larry after lunch",
            isCompleted: true,
            isChecked: true,
          }
          ];

        const response: todoType[] = todoStoreData;

        const expectedAction = {
            payload: todoStoreData,
            type: todoAction.ADD_TO_TODO_LIST
        }
        expect(addToTodoList(response)).toEqual(expectedAction);
    });

    it('SET_ACTIVE_TAB returns an action of the expected shape', () => {
      const todoStoreData: tabTypes = tabTypes.ALL_TAB
      const response: tabTypes = todoStoreData;
      const expectedAction = {
          payload: todoStoreData,
          type: todoAction.SET_ACTIVE_TAB
      }
      expect(setActiveTab(response)).toEqual(expectedAction);
  });

  it('SET_ALL_TODO_COMPLETED returns an action of the expected shape', () => {
    const todoStoreData = true;
    const response: boolean = todoStoreData;
    const expectedAction = {
        payload: todoStoreData,
        type: todoAction.SET_ALL_TODO_COMPLETED
    }
    expect(setAllTodoCompleted(response)).toEqual(expectedAction);
});
})


