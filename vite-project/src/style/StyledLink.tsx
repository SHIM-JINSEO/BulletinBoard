import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline-block;
  @import url("https://fonts.googleapis.com/css2?family=Reddit+Sans+Condensed:wght@592&display=swap");
  font-family: "Reddit Sans Condensed", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  min-width: 80px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid tomato;
  color: tomato;
  background-color: white;
  margin: 4px;
`;
export default StyledLink;
