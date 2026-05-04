import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { mockCourses } from "@/test/mocks/handlers";
import Home from "./page";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("Home page", () => {
  it("shows loading skeletons before courses load", () => {
    renderWithClient(<Home />);

    expect(screen.getByRole("heading", { name: /jedi academy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /available courses/i })).toBeInTheDocument();
  });

  it("displays course cards after fetching data", async () => {
    renderWithClient(<Home />);

    for (const course of mockCourses) {
      expect(
        await screen.findByRole("heading", { name: course.title })
      ).toBeInTheDocument();
    }
  });

  it("shows instructor name on each course card", async () => {
    renderWithClient(<Home />);

    await screen.findByRole("heading", { name: mockCourses[0].title });

    for (const course of mockCourses) {
      expect(screen.getByText(course.instructorName)).toBeInTheDocument();
    }
  });

  it("shows the schedule for each course", async () => {
    renderWithClient(<Home />);

    await screen.findByRole("heading", { name: mockCourses[0].title });

    for (const course of mockCourses) {
      expect(screen.getByText(course.schedule)).toBeInTheDocument();
    }
  });

  it("shows remaining spots for each course", async () => {
    renderWithClient(<Home />);

    await screen.findByRole("heading", { name: mockCourses[0].title });

    for (const course of mockCourses) {
      const spotsLeft = course.maxCapacity - course.enrollmentCount;
      expect(screen.getByText(`${String(spotsLeft)} spots left`)).toBeInTheDocument();
    }
  });

  it("links each course card to its detail page", async () => {
    renderWithClient(<Home />);

    await screen.findByRole("heading", { name: mockCourses[0].title });

    for (const course of mockCourses) {
      const link = screen.getByRole("link", { name: new RegExp(course.title) });
      expect(link).toHaveAttribute("href", `/courses/${String(course.id)}`);
    }
  });

  it("shows hero description text", () => {
    renderWithClient(<Home />);

    expect(
      screen.getByText(/train with legendary jedi masters/i)
    ).toBeInTheDocument();
  });

  it("handles API failure gracefully", async () => {
    server.use(
      http.get("/api/courses", () => new HttpResponse(null, { status: 500 }))
    );

    renderWithClient(<Home />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/failed to load courses/i);
    expect(screen.getByRole("heading", { name: /available courses/i })).toBeInTheDocument();
  });
});
