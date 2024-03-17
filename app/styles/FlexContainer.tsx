import { ReactNode } from "react";

export const FlexContainer = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "flex" }}>{children}</div>
);
