function normalize(value) {
  return value.trim().toLowerCase();
}

function filterCourses(courses, filters = {}) {
  const search = normalize(filters.search || '');
  const selectedProducts = (filters.selectedProducts || []).filter(Boolean);
  const selectedRoles = (filters.selectedRoles || []).filter(Boolean);
  const selectedLevels = (filters.selectedLevels || []).filter(Boolean);
  const selectedSubjects = (filters.selectedSubjects || []).filter(Boolean);
  const sortBy = filters.sortBy || 'popular';

  let result = courses.filter((course) => {
    const searchableText = [
      course.title,
      course.category,
      course.description,
      course.instructor,
      course.difficulty,
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !search || searchableText.includes(search);
    const matchesProduct =
      selectedProducts.length === 0 || selectedProducts.includes(course.category);
    const matchesRole =
      selectedRoles.length === 0 ||
      selectedRoles.some((role) => searchableText.includes(role.toLowerCase()));
    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(course.difficulty);
    const matchesSubject =
      selectedSubjects.length === 0 ||
      selectedSubjects.some((subject) => searchableText.includes(subject.toLowerCase()));

    return matchesSearch && matchesProduct && matchesRole && matchesLevel && matchesSubject;
  });

  if (sortBy === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'duration') {
    result = [...result].sort((a, b) => a.duration.localeCompare(b.duration));
  } else if (sortBy === 'price') {
    result = [...result].sort((a, b) => a.price - b.price);
  } else {
    result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}

module.exports = {
  filterCourses,
};
