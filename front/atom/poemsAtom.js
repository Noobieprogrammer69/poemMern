import { atom } from "recoil";

const poemsAtom = atom({
	key: "postsAtom",
	default: [],
});

export default poemsAtom;