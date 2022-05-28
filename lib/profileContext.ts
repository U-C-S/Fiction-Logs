import React from "react";

export let ProfileContextDefaultValue = {
	name: "Manté",
	image: "https://avatars.dicebear.com/api/avataaars/chanakya555.svg",
};

export const ProfileContext = React.createContext(ProfileContextDefaultValue);
