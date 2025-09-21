// Data loader utility for JSON files
export const loadData = async (filename: string) => {
  try {
    const response = await fetch(`/data/en/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
};

// Predefined data loaders for each command
export const loadContactData = () => loadData('contact-en.json');
export const loadEducationData = () => loadData('education-en.json');
export const loadSkillsData = () => loadData('tech-skills-en.json');
export const loadProjectsData = () => loadData('projects-en.json');
export const loadExperienceData = () => loadData('jobs-en.json');
export const loadProfileData = () => loadData('profile-en.json');
