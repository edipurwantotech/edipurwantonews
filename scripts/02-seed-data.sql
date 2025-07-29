-- Insert sample categories
INSERT INTO categories (name) VALUES 
  ('Technology'),
  ('Lifestyle'),
  ('Business'),
  ('Health')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tags
INSERT INTO tags (name) VALUES 
  ('JavaScript'),
  ('React'),
  ('Next.js'),
  ('Web Development'),
  ('Tutorial'),
  ('Tips')
ON CONFLICT (name) DO NOTHING;

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, username, password) VALUES 
  ('admin@example.com', 'admin', '$2a$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQj')
ON CONFLICT (email) DO NOTHING;
