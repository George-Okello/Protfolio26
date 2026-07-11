import sys
import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace imports
imports_to_remove = [
    'import ResearchSandbox from "./components/ResearchSandbox";',
    'import PublicationsList from "./components/PublicationsList";',
    'import AcademicTimeline from "./components/AcademicTimeline";',
    'import EducationSpiral from "./components/EducationSpiral";',
    'import GenerativeArt from "./components/GenerativeArt";',
    'import { TechnicalSkills } from "./components/TechnicalSkills";'
]

lazy_imports = """
import { lazy, Suspense } from "react";
const ResearchSandbox = lazy(() => import("./components/ResearchSandbox"));
const PublicationsList = lazy(() => import("./components/PublicationsList"));
const AcademicTimeline = lazy(() => import("./components/AcademicTimeline"));
const EducationSpiral = lazy(() => import("./components/EducationSpiral"));
const GenerativeArt = lazy(() => import("./components/GenerativeArt"));
const TechnicalSkills = lazy(() => import("./components/TechnicalSkills").then(m => ({ default: m.TechnicalSkills })));
"""

for imp in imports_to_remove:
    content = content.replace(imp, '')

# We need to add the lazy imports after AmbientBackground or similar
if 'import NeuralCanvas' in content:
    content = content.replace('import NeuralCanvas from "./components/NeuralCanvas";', 'import NeuralCanvas from "./components/NeuralCanvas";' + lazy_imports)

# Replace usage with Suspense wrappers
# It's better to wrap the whole inner content of the sections where these are used with Suspense
# Let's see if we can just wrap the component tags.

def wrap_with_suspense(content, component_tag):
    pattern = rf'(<{component_tag}[^>]*/>)'
    replacement = rf'<Suspense fallback={{<div className="w-full h-32 flex items-center justify-center opacity-50"><div className="animate-pulse">Loading {component_tag}...</div></div>}}>\n            \1\n          </Suspense>'
    return re.sub(pattern, replacement, content)

content = wrap_with_suspense(content, 'ResearchSandbox')
content = wrap_with_suspense(content, 'PublicationsList')
content = wrap_with_suspense(content, 'EducationSpiral')
content = wrap_with_suspense(content, 'AcademicTimeline')
content = wrap_with_suspense(content, 'TechnicalSkills')
content = wrap_with_suspense(content, 'GenerativeArt')

with open('src/App.tsx', 'w') as f:
    f.write(content)

