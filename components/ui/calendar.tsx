"use client"

import * as React from "react"
import { cn } from "cn"
import { enUS } from "date-fns/locale"
import { startOfMonth } from "date-fns"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
  type NavProps,
  useDayPicker,
} from "react-day-picker"

import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@/components/icons"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  dateLib?: undefined
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale = enUS,
  dateLib: _dateLib,
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar w-[312px] rounded-[10px] border border-border bg-card p-1.5 shadow-[0_6px_9px_rgba(24,26,36,0.12)] [--cell-radius:8px] [--cell-size:36px]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        formatWeekdayName: (date) =>
          date.toLocaleDateString(locale?.code, { weekday: "narrow" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn("flex flex-col", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-0", defaultClassNames.month),
        nav: cn("flex h-10 w-full items-center", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn("sr-only", defaultClassNames.month_caption),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("flex h-6 w-9 items-center justify-center text-[10px] font-semibold text-muted-foreground select-none", defaultClassNames.weekday),
        week: cn("mt-1 flex w-full gap-1", defaultClassNames.week),
        weeks: cn("flex flex-col gap-1", defaultClassNames.weeks),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] text-muted-foreground select-none",
          defaultClassNames.week_number
        ),
        day: cn("group/day relative h-8 w-9 flex-none rounded-(--cell-radius) p-0 text-center select-none", defaultClassNames.day),
        range_start: cn(
          "relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn("font-semibold text-primary", defaultClassNames.today),
        outside: cn("text-muted-foreground opacity-45", defaultClassNames.outside),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Nav: (props) => <CalendarNav {...props} locale={locale} />,
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarNav({ onPreviousClick, onNextClick, previousMonth, nextMonth, locale }: NavProps & { locale?: Partial<Locale> }) {
  const { months, goToMonth } = useDayPicker()
  const month = months[0]?.date
  const today = new Date()

  return (
    <nav aria-label="Calendar navigation" className="flex h-10 w-full items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" aria-label="Previous month" disabled={!previousMonth} onClick={onPreviousClick} className="rounded-lg bg-table-header">
          <ChevronLeftIcon className="size-3.5" />
        </Button>
        <span className="text-[13px] font-semibold text-foreground">{month?.toLocaleDateString(locale?.code, { month: "long", year: "numeric" })}</span>
        <Button type="button" variant="outline" size="icon" aria-label="Next month" disabled={!nextMonth} onClick={onNextClick} className="rounded-lg bg-table-header">
          <ChevronRightIcon className="size-3.5" />
        </Button>
      </div>
      <Button type="button" variant="ghost" onClick={() => goToMonth(startOfMonth(today))} className="h-7 gap-1.5 rounded-lg bg-primary-tint px-2.5 text-[11px] font-semibold text-primary hover:bg-primary-tint">
        <CalendarDaysIcon aria-hidden="true" className="size-3.5" />
        Today
      </Button>
    </nav>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative isolate z-10 flex h-8 w-9 items-center justify-center rounded-(--cell-radius) border-0 p-0 text-xs font-medium leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-ring/50 group-data-[outside=true]/day:bg-table-header group-data-[outside=true]/day:text-muted-foreground group-data-[outside=true]/day:opacity-45 data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground hover:bg-primary-tint hover:text-primary",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
