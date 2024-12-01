import type { Meta, StoryObj } from "@storybook/react";

import Viewer from "../Viewer";
import { wallConfig, walls } from "../data";

const meta = {
  title: "Viewer",
  component: Viewer,
} satisfies Meta<typeof Viewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    wallConfig,
    walls,
  },
};
