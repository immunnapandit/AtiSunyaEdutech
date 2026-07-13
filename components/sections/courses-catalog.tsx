"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { CourseCard } from "@/components/features/course-card";
import { courses } from "@/data/courses";
import { filterCourses } from "@/lib/course-filters";
import type { Course, Difficulty } from "@/types";

type SortOption = "popular" | "rating" | "duration" | "price";

function CheckboxRow({
  label,
  checked,
  onChange,
  nested = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  nested?: boolean;
}) {
  return (
    <label className="flex min-h-8 items-center gap-3 text-sm font-medium text-navy">
      <span className={nested ? "ml-6" : ""} />
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded border-navy-100 text-brand focus:ring-brand"
      />
      <span>{label}</span>
    </label>
  );
}

function FilterGroup({
  title,
  searchLabel,
  items,
  nested = false,
  selectedItems,
  onToggle,
}: {
  title: string;
  searchLabel?: string;
  items: string[];
  nested?: boolean;
  selectedItems: string[];
  onToggle: (item: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) => item.toLowerCase().includes(value));
  }, [items, query]);

  return (
    <section className="border-b border-navy-100 pb-6">
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      {searchLabel && (
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchLabel}
          className="mt-4 h-11 w-full rounded border border-navy-100 px-3 text-sm outline-none transition focus:border-brand"
        />
      )}
      <div className="mt-4 max-h-80 space-y-1 overflow-y-auto pr-2">
        {filteredItems.map((item) => (
          <CheckboxRow
            key={item}
            label={item}
            nested={nested}
            checked={selectedItems.includes(item)}
            onChange={() => onToggle(item)}
          />
        ))}
      </div>
    </section>
  );
}

export function CoursesCatalog() {
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Difficulty[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const productOptions = useMemo(() => {
    const values = courses.map((course) => course.category);
    return Array.from(new Set(values));
  }, []);

  const roleOptions = [
    "Administrator",
    "AI Engineer",
    "Business Analyst",
    "Developer",
    "Security Specialist",
  ];

  const subjectOptions = ["Cloud", "AI", "Data", "Security", "Business", "Development"];

  const levelOptions: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

  const filteredCourses = filterCourses(courses, {
    search,
    selectedProducts,
    selectedRoles,
    selectedLevels,
    selectedSubjects,
    sortBy,
  }) as Course[];

  const toggleValue = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
      return;
    }
    setSelectedValues([...selectedValues, value]);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedProducts([]);
    setSelectedRoles([]);
    setSelectedLevels([]);
    setSelectedSubjects([]);
    setSortBy("popular");
  };

    return (
  <div className="bg-white pt-site-header-loose pb-20 text-navy">
      <section className="section-band relative overflow-hidden border-b border-navy-100">
        <div className="mx-auto grid min-h-[220px] max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 xl:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
                M
              </span>
              <span className="text-sm font-semibold text-navy-400">
                Microsoft Learn inspired catalog
              </span>
            </div>
            <h1 className="heading-hero text-navy">
              Browse all training
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-navy-400">
              Learn new skills and discover the power of Microsoft products with
              step-by-step guidance. Start your journey today by exploring our
              learning paths and modules.
            </p>
          </div>

          <div className="relative hidden min-h-[270px] lg:block">
            <div className="absolute right-0 top-1/2 h-64 w-[92%] -translate-y-1/2 rounded-lg bg-white/35" />
            <div className="absolute left-20 top-20 grid grid-cols-8 gap-2 opacity-80">
              {Array.from({ length: 48 }).map((_, index) => (
                <span
                  key={index}
                  className="h-7 w-7 rounded bg-brand-100 shadow-sm"
                />
              ))}
            </div>
            <div className="absolute left-44 top-8 h-32 w-24 rounded-lg bg-brand shadow-lifted" />
            <div className="absolute right-20 top-8 h-20 w-28 rounded-lg bg-brand-400 shadow-lifted" />
            <div className="absolute right-44 top-32 h-16 w-20 rounded-lg bg-brand-100 shadow-soft" />
            <div className="absolute right-6 top-32 h-28 w-40 rounded-lg border-4 border-white/80" />
            <div className="absolute right-64 top-4 h-16 w-20 rounded-lg bg-brand-50 shadow-soft" />
            <div className="absolute left-72 top-28 h-32 w-2 rounded-full bg-white shadow-glow" />
          </div>
        </div>
      </section>

   <section className="mt-10 grid w-full max-w-full gap-8 px-4 py-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 xl:px-10">
        <aside className="space-y-6 rounded-lg border border-navy-100 bg-white p-6 shadow-soft lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-3 border-b border-navy-100 pb-5">
      <div>
  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
    FILTERS
  </p>

  <h2 className="mt-2 text-2xl font-bold text-navy">
    Explore Courses
  </h2>

  <p className="mt-2 text-sm leading-6 text-navy-500">
    Filter by product, role, level and subject.
  </p>

  <div className="mt-5 flex w-full">
  
    <button
      type="button"
      onClick={clearFilters}
      className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
    >
      <RotateCcw className="h-4 w-4" />
      Clear Filters
    </button>
  </div>
</div>
          </div>

          <div className="space-y-6">
            <FilterGroup
              title="Products"
              searchLabel="Find a product"
              items={productOptions}
              selectedItems={selectedProducts}
              onToggle={(item) => toggleValue(item, selectedProducts, setSelectedProducts)}
            />

            <FilterGroup
              title="Roles"
              searchLabel="Find a role"
              items={roleOptions}
              selectedItems={selectedRoles}
              onToggle={(item) => toggleValue(item, selectedRoles, setSelectedRoles)}
            />
          </div>

          <div className="space-y-6">
            <section className="rounded-lg border border-navy-100 bg-slate-50/80 p-5">
              <h2 className="text-xl font-bold text-navy">Levels</h2>
              <div className="mt-5 space-y-3">
                {levelOptions.map((level) => (
                  <CheckboxRow
                    key={level}
                    label={level}
                    checked={selectedLevels.includes(level)}
                    onChange={() =>
                      toggleValue(level, selectedLevels, (values) => {
                        setSelectedLevels(values as Difficulty[]);
                      })
                    }
                  />
                ))}
              </div>
            </section>

            <FilterGroup
              title="Subjects"
              searchLabel="Find a subject"
              items={subjectOptions}
              nested
              selectedItems={selectedSubjects}
              onToggle={(item) => toggleValue(item, selectedSubjects, setSelectedSubjects)}
            />
          </div>
        </aside>

        <div>
          <form
            className="flex flex-col gap-3 rounded-lg border border-navy-100 bg-white p-4 shadow-soft sm:flex-row sm:items-center"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses"
              className="h-12 min-w-0 flex-1 rounded-xl border border-navy-100 bg-slate-50 px-4 text-base outline-none transition focus:border-brand focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-base font-bold text-white transition hover:bg-brand-600"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-navy-100 bg-navy-50/70 px-4 py-4 shadow-sm">
            <p className="text-2xl font-bold text-navy">
              {filteredCourses.length.toLocaleString()} results
            </p>
            <div className="flex items-center gap-3 text-lg text-navy">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="rounded border border-navy-100 bg-white px-3 py-2 text-sm font-semibold text-brand outline-none"
              >
                <option value="popular">Popular</option>
                <option value="rating">Highest rated</option>
                <option value="duration">Duration</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-navy-200 bg-navy-50/70 p-8 text-center text-navy-400 sm:p-10">
              No courses match the current filters. Try broadening your search or clearing the selections.
            </div>
          ) : (
           <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course: Course, index: number) => (
                <CourseCard key={course.slug} course={course} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
