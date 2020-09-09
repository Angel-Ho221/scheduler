
import React from "react";
import Appointment from "components/Appointment/index";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});








