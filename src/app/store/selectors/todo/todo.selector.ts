import { IRootState } from "../../reducers/root.state";
const todoStoreSelector = ({todoStore}: IRootState) => todoStore;
export { todoStoreSelector};