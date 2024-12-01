import type { Meta, StoryObj } from "@storybook/react";

import Editor from "../Editor";

const meta = {
  title: "Editor",
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};
