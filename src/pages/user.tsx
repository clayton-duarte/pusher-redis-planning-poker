import React, { ChangeEvent, useState } from "react";
import { NextPage } from "next";

import { useUser } from "../providers/user";
import Button from "../components/Button";
import Input from "../components/Input";
import Main from "../components/Main";

const UserPage: NextPage = () => {
  const [user, setUser] = useState<string>("");
  const { createUser } = useUser();

  const handleClick = () => {
    // TODO > validation
    if (user) {
      createUser(user);
    }
  };

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <Main>
      <Input onChange={handelChange} placeholder="username" />
      <Button onClick={handleClick}>submit</Button>
    </Main>
  );
};

export default UserPage;
