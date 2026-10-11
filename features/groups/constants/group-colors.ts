export const GROUP_COLORS = [
  { value: "neutral", label: "Neutral" },
  { value: "purple", label: "Purple" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "teal", label: "Teal" },
  { value: "pink", label: "Pink" },
] as const;

const classes = {
  neutral: "bg-group-neutral",
  purple: "bg-group-purple",
  blue: "bg-group-blue",
  violet: "bg-group-violet",
  teal: "bg-group-teal",
  pink: "bg-group-pink",
} as const;

export function groupColorClass(color: string | null) {
  return classes[GROUP_COLORS.find((option) => option.value === color)?.value ?? "neutral"];
}
