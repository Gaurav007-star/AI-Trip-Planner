import { HeaderWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";

function Header() {
  return (
    <HeaderWrapper>
      <img src="/logo.svg" alt="logoicon" />
      <Button>
        Login
      </Button>
    </HeaderWrapper>
  );
}

export default Header;
