import type { Meta, StoryObj } from "@storybook/react";

import ThreeApp from "../ThreeApp";
import { wallConfig, walls } from "../data";

const meta = {
  title: "ThreeApp",
  component: ThreeApp,
} satisfies Meta<typeof ThreeApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    wallConfig,
    walls,
  },
};
