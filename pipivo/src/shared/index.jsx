import { ThreeDots } from "react-loader-spinner";

// eslint-disable-next-line react/prop-types
export const BaseLink = ({ children, ...props }) => {
  return (
    <a href={"#"} className={"baseLink"} {...props}>
      {children}
    </a>
  );
};

export const LoadingDots = () => (
  <ThreeDots
    visible={true}
    height="120"
    width="120"
    color="#4fa94d"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
  />
);

export const appName = "pipivo";
