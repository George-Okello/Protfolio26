import sys

with open('src/components/PublicationsList.tsx', 'r') as f:
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};"""

if target_variants in content:
    content = content.replace(target_variants, "")

# 2. Fix the first motion.div inside PublicationCard
target_card1 = """    <motion.div 
      variants={itemVariants}
      style={{ perspective: "1000px" }}
    >"""

replacement_card1 = """    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ perspective: "1000px" }}
    >"""

if target_card1 in content:
    content = content.replace(target_card1, replacement_card1)

# 3. Fix the Conference Papers Grid
target_grid1 = """                <motion.div 
                  className="grid grid-cols-1 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >"""

replacement_grid1 = """                <div className="grid grid-cols-1 gap-4">"""

target_grid1_end = """                  ))}
                </motion.div>
              </div>"""

replacement_grid1_end = """                  ))}
                </div>
              </div>"""

if target_grid1 in content:
    content = content.replace(target_grid1, replacement_grid1)
    content = content.replace(target_grid1_end, replacement_grid1_end)


# 4. Fix the Preprints Grid
target_grid2 = """              <motion.div 
                className="grid grid-cols-1 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >"""

replacement_grid2 = """              <div className="grid grid-cols-1 gap-4">"""

target_grid2_end = """                ))}
              </motion.div>
            </div>"""

replacement_grid2_end = """                ))}
              </div>
            </div>"""

if target_grid2 in content:
    content = content.replace(target_grid2, replacement_grid2)
    content = content.replace(target_grid2_end, replacement_grid2_end)


# 5. Fix the Projects Grid
target_grid3 = """            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >"""

replacement_grid3 = """            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">"""

target_grid3_end = """              </motion.div>
              ))}
            </motion.div>
          </div>"""

replacement_grid3_end = """              </motion.div>
              ))}
            </div>
          </div>"""

if target_grid3 in content:
    content = content.replace(target_grid3, replacement_grid3)
    content = content.replace(target_grid3_end, replacement_grid3_end)


# 6. Fix the motion.div inside Projects Grid
target_proj_card = """                <motion.div 
                  key={p.id} 
                  variants={itemVariants}
                  style={{ perspective: "1000px" }}
                >"""

replacement_proj_card = """                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{ perspective: "1000px" }}
                >"""

if target_proj_card in content:
    content = content.replace(target_proj_card, replacement_proj_card)


with open('src/components/PublicationsList.tsx', 'w') as f:
    f.write(content)

