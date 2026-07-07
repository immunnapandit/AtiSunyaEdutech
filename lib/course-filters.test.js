const test = require('node:test');
const assert = require('node:assert/strict');
const { filterCourses } = require('./course-filters');

test('filters courses by search and difficulty', () => {
  const courses = [
    {
      slug: 'azure-cloud',
      title: 'Azure Cloud Administration',
      category: 'Azure Cloud',
      difficulty: 'Intermediate',
      duration: '10 weeks',
      studentsCount: 8210,
      instructor: 'Azure Team',
      instructorAvatar: 'AZ',
      rating: 4.8,
      reviewCount: 1904,
      price: 329,
      thumbnail: 'fullstack',
      thumbnailGradient: 'from-navy-100',
      description: 'Learn Azure deployment and architecture.',
      featured: true,
    },
    {
      slug: 'copilot-ai',
      title: 'Microsoft Copilot & AI Services',
      category: 'Microsoft AI',
      difficulty: 'Advanced',
      duration: '8 weeks',
      studentsCount: 5130,
      instructor: 'AI Team',
      instructorAvatar: 'AI',
      rating: 4.9,
      reviewCount: 887,
      price: 399,
      thumbnail: 'ml',
      thumbnailGradient: 'from-cyan-100',
      description: 'Train teams on Copilot Studio and Azure AI services.',
      featured: true,
    },
    {
      slug: 'power-platform',
      title: 'Power Platform App Maker',
      category: 'Power Platform',
      difficulty: 'Beginner',
      duration: '5 weeks',
      studentsCount: 6720,
      instructor: 'Power Team',
      instructorAvatar: 'PP',
      rating: 4.7,
      reviewCount: 1120,
      price: 199,
      thumbnail: 'pm',
      thumbnailGradient: 'from-royal-50',
      description: 'Create business applications with Power Apps.',
    },
  ];

  const results = filterCourses(courses, {
    search: 'azure',
    selectedProducts: ['Azure Cloud'],
    selectedRoles: [],
    selectedLevels: ['Intermediate'],
    selectedSubjects: [],
    sortBy: 'popular',
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].slug, 'azure-cloud');
});
