import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useUser } from "../providers/user";

const Input = styled.input`
  margin: 0;
`;

const Button = styled.button`
  margin: 0;
`;

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
    <>
      <Input onChange={handelChange} placeholder="username" />
      <Button onClick={handleClick}>submit</Button>
    </>
  );
};

export default UserPage;
