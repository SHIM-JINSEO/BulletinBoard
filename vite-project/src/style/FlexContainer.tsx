import styled from "styled-components";

interface Props {
  width?: string;
height?: string;
  direction?: string;
  justifycontent?: string;
  alignitems?: string;
  deleteborder?: boolean;
  deletecolor?: boolean;
  flexwrap?: string;
}

const FlexContainer = styled.div<Props>`
  text-align: center;
  display: flex;
  border: ${(props) => (props.deleteborder ? "none" : "3px solid #ffa494")};
  flex-direction: ${(props): string =>
    props.direction ? props.direction : "column"};
  justify-content: ${(props): string =>
    props.justifycontent ? props.justifycontent : "space-between"};
  align-items: ${(props): string =>
    props.alignitems ? props.alignitems : "center"};
  background-color: ${(props) => (props.deletecolor ? "none" : "whitesmoke")};
  width: ${(props): string => (props.width ? props.width : "auto")};
  height: ${(props): string => (props.height ? props.height : "auto")};
  border-radius: 8px;
  margin: 4px;
  padding: 8px;
  flex-wrap: ${(props): string => (props.flexwrap ? props.flexwrap : "nowrap")};
`;

export default FlexContainer;
