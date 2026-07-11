import sys

with open('src/components/AcademicTimeline.tsx', 'r') as f:
    content = f.read()

# 1. Remove the variants objects
target_variants = """const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};"""

if target_variants in content:
    content = content.replace(target_variants, "")

# 2. Fix the first motion.div inside renderCard
target_card1 = """        <motion.div
          key={key}
          layout
          variants={itemVariants}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className={`relative p-6 md:p-8 border flex flex-col justify-between ${spanClass} ${"""

replacement_card1 = """        <motion.div
          key={key}
          layout
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`relative p-6 md:p-8 border flex flex-col justify-between ${spanClass} ${"""

if target_card1 in content:
    content = content.replace(target_card1, replacement_card1)

# 3. Fix the second motion.div inside renderCard
target_card2 = """    return (
      <motion.div
        key={key}
        layout
        variants={itemVariants}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`p-6 md:p-8 border flex flex-col ${spanClass} ${"""

replacement_card2 = """    return (
      <motion.div
        key={key}
        layout
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`p-6 md:p-8 border flex flex-col ${spanClass} ${"""

if target_card2 in content:
    content = content.replace(target_card2, replacement_card2)

# 4. Fix the Cards Grid
target_grid = """              <motion.div 
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >"""

replacement_grid = """              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">"""

target_grid_end = """              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>"""

replacement_grid_end = """              </div>
            </motion.div>
          ))}
        </AnimatePresence>"""

if target_grid in content:
    content = content.replace(target_grid, replacement_grid)
    content = content.replace(target_grid_end, replacement_grid_end)


with open('src/components/AcademicTimeline.tsx', 'w') as f:
    f.write(content)

