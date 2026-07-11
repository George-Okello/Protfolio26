import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Insert scrollToSection function
func = """
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
"""

content = content.replace("const { scrollYProgress } = useScroll();", func + "\n  const { scrollYProgress } = useScroll();")

# Update desktop nav links
content = content.replace(
    'href={link.href}',
    'href={link.href}\n                onClick={(e) => scrollToSection(e, link.href)}'
)

# Wait, there are two sets of nav links: one desktop, one mobile.
# But both map over `link.href`. The desktop one is:
# <a key={link.label} href={link.href} className="hover:opacity-70 transition-opacity">
# The mobile one is:
# <motion.a key={link.label} href={link.href} className="..." onClick={() => setMobileMenuOpen(false)}>

# Let's fix the mobile one specifically.
# It has: `onClick={() => setMobileMenuOpen(false)}`
content = content.replace('onClick={() => setMobileMenuOpen(false)}', 'onClick={(e) => scrollToSection(e, link.href)}')

# Also update the desktop nav:
content = re.sub(
    r'(<a\s+key={link\.label}\s+href={link\.href})',
    r'\1 onClick={(e) => scrollToSection(e, link.href)}',
    content
)

# Update viewport margins
content = content.replace('margin: "-100px"', 'margin: "-50px"')

with open("src/App.tsx", "w") as f:
    f.write(content)

