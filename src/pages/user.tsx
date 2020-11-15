import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { NextPage } from "next";

import { useUser } from "../providers/user";
import Button from "../components/Button";
import Input from "../components/Input";
import Text from "../components/Text";
import Main from "../components/Main";

const Helper = styled.span`
  color: ${(props) => props.theme.error};
  font-size: 0.75rem;
`;

const UserPage: NextPage = () => {
  const [user, setUser] = useState<string>("");
  const { createUser } = useUser();

  const invalidUser = user?.length < 3 || user?.length > 32;

  const handleClick = () => {
    createUser(user);
  };

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  return (
    <Main>
      <Text primary>Welcome!</Text>
      <Text>Please insert a name:</Text>
      <Input placeholder="Leroy Jenkins" onChange={handelChange} />
      {invalidUser && <Helper>Between 3 and 16 characters</Helper>}
      <Button disabled={invalidUser} onClick={handleClick}>
        ✔️ confirm
      </Button>
    </Main>
  );
};

export default UserPage;
