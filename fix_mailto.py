import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Fix the mailto link onClick
bad_onClick = 'onClick={(e) => scrollToSection(e, link.href)}'
good_onClick = 'onClick={() => setMobileMenuOpen(false)}'

# The one under mailto:georgeokelloouma@gmail.com
# We can just replace the specific one
pattern = r'(<a\s+href="mailto:georgeokelloouma@gmail\.com"\s+className="[^"]+"\s+)onClick=\{\(e\) => scrollToSection\(e, link\.href\)\}'
replacement = r'\1onClick={() => setMobileMenuOpen(false)}'
content = re.sub(pattern, replacement, content)

with open("src/App.tsx", "w") as f:
    f.write(content)

