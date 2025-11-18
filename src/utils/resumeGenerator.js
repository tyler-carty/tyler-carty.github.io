import { jsPDF } from 'jspdf';

/**
 * ATS-Friendly Resume Generator
 *
 * Generates a PDF resume from portfolioData with formatting optimized for
 * Applicant Tracking Systems (ATS). Uses simple formatting, standard fonts,
 * and clear section structure.
 */

export const generateResume = (portfolioData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addText = (text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize / 2);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // ============================================
  // HEADER - Contact Information
  // ============================================
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(portfolioData.personalInfo.name.toUpperCase(), pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const contactInfo = [
    portfolioData.personalInfo.email,
    portfolioData.personalInfo.location,
    portfolioData.personalInfo.links.linkedin,
    portfolioData.personalInfo.links.github
  ].join(' | ');
  doc.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += lineHeight * 2;

  // ============================================
  // PROFESSIONAL SUMMARY
  // ============================================
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
  yPosition += lineHeight;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(portfolioData.personalInfo.tagline, pageWidth - 2 * margin);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * lineHeight + 5;

  // ============================================
  // PROFESSIONAL EXPERIENCE
  // ============================================
  checkNewPage();
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PROFESSIONAL EXPERIENCE', margin, yPosition);
  yPosition += lineHeight + 2;

  // Full-time experience
  portfolioData.experience.forEach((exp) => {
    checkNewPage(40);

    // Company and Role
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${exp.company}`, margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`${exp.role} | ${exp.period}`, margin, yPosition);
    yPosition += lineHeight;

    if (exp.team) {
      doc.setFont('helvetica', 'normal');
      doc.text(`Team: ${exp.team}`, margin, yPosition);
      yPosition += lineHeight;
    }

    // Description
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
    doc.text(descLines, margin, yPosition);
    yPosition += descLines.length * lineHeight + 2;

    // Achievements
    exp.achievements.forEach((achievement) => {
      checkNewPage(15);
      const bulletLines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 2 * margin - 5);
      doc.text(bulletLines, margin + 5, yPosition);
      yPosition += bulletLines.length * lineHeight;
    });

    // Technologies
    doc.setFont('helvetica', 'italic');
    const techText = `Technologies: ${exp.technologies.join(', ')}`;
    const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin);
    doc.text(techLines, margin, yPosition);
    yPosition += techLines.length * lineHeight + 5;
  });

  // Freelance experience
  if (portfolioData.freelanceExperience && portfolioData.freelanceExperience.length > 0) {
    portfolioData.freelanceExperience.forEach((exp) => {
      checkNewPage(40);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${exp.client} (Freelance)`, margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(`${exp.project} | ${exp.period}`, margin, yPosition);
      yPosition += lineHeight;

      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * lineHeight + 2;

      exp.achievements.forEach((achievement) => {
        checkNewPage(15);
        const bulletLines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 2 * margin - 5);
        doc.text(bulletLines, margin + 5, yPosition);
        yPosition += bulletLines.length * lineHeight;
      });

      doc.setFont('helvetica', 'italic');
      const techText = `Technologies: ${exp.technologies.join(', ')}`;
      const techLines = doc.splitTextToSize(techText, pageWidth - 2 * margin);
      doc.text(techLines, margin, yPosition);
      yPosition += techLines.length * lineHeight + 5;
    });
  }

  // ============================================
  // EDUCATION
  // ============================================
  checkNewPage(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('EDUCATION', margin, yPosition);
  yPosition += lineHeight + 2;

  portfolioData.education.forEach((edu) => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.institution, margin, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`${edu.degree} - ${edu.grade} | ${edu.period}`, margin, yPosition);
    yPosition += lineHeight;

    if (edu.achievements && edu.achievements.length > 0) {
      doc.setFont('helvetica', 'normal');
      edu.achievements.forEach((achievement) => {
        checkNewPage(10);
        const bulletLines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 2 * margin - 5);
        doc.text(bulletLines, margin + 5, yPosition);
        yPosition += bulletLines.length * lineHeight;
      });
    }
    yPosition += 5;
  });

  // ============================================
  // TECHNICAL SKILLS
  // ============================================
  checkNewPage(80);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TECHNICAL SKILLS', margin, yPosition);
  yPosition += lineHeight + 2;

  doc.setFontSize(10);
  const skills = portfolioData.skills;

  const skillsSections = [
    { title: 'Programming Languages', items: skills.languages },
    { title: 'Cloud & Infrastructure', items: skills.cloud },
    { title: 'Data Science & ML', items: skills.dataScience },
    { title: 'Data Engineering', items: skills.dataEngineering },
    { title: 'Web Development', items: skills.webDevelopment },
    { title: 'Tools & Methodologies', items: skills.tools }
  ];

  skillsSections.forEach((section) => {
    if (section.items && section.items.length > 0) {
      checkNewPage(15);
      doc.setFont('helvetica', 'bold');
      doc.text(`${section.title}:`, margin, yPosition);
      yPosition += lineHeight;

      doc.setFont('helvetica', 'normal');
      const skillsText = section.items.join(', ');
      const skillLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin - 5);
      doc.text(skillLines, margin + 5, yPosition);
      yPosition += skillLines.length * lineHeight + 2;
    }
  });

  // ============================================
  // SAVE PDF
  // ============================================
  const fileName = `${portfolioData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
  doc.save(fileName);
};
