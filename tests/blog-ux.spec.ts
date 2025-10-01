import { test, expect, devices } from '@playwright/test';

test.describe('Blog Page UX Analysis', () => {
  let uxIssues: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    issue: string;
    element?: string;
    recommendation: string;
  }> = [];

  const addUXIssue = (severity: 'critical' | 'high' | 'medium' | 'low', category: string, issue: string, recommendation: string, element?: string) => {
    uxIssues.push({ severity, category, issue, recommendation, element });
  };

  test.beforeEach(async ({ page }) => {
    // Clear UX issues for each test
    uxIssues = [];
    
    // Set up performance monitoring
    await page.route('**/*', (route, request) => {
      const startTime = Date.now();
      route.continue().then(() => {
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Flag slow resources (over 3 seconds)
        if (loadTime > 3000) {
          addUXIssue('high', 'Performance', 
            `Slow resource loading: ${request.url()} took ${loadTime}ms`, 
            'Optimize resource loading, consider lazy loading, compression, or CDN');
        }
      });
    });
  });

  test('Desktop Blog Page - Basic Functionality and UX', async ({ page }) => {
    console.log('Starting desktop blog page UX analysis...');
    
    // Measure page load time
    const startTime = Date.now();
    await page.goto('/blog');
    const endTime = Date.now();
    const pageLoadTime = endTime - startTime;
    
    console.log(`Page load time: ${pageLoadTime}ms`);
    
    if (pageLoadTime > 3000) {
      addUXIssue('high', 'Performance', 
        `Page load time is ${pageLoadTime}ms`, 
        'Optimize page loading time to under 3 seconds for better UX');
    }

    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/blog-desktop-initial.png', 
      fullPage: true 
    });

    // Check for essential elements
    const title = page.locator('h1, .title, [data-testid="page-title"]');
    const blogPosts = page.locator('article, .blog-post, .post, [data-testid="blog-post"]');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check if blog title exists and is accessible
    const titleCount = await title.count();
    if (titleCount === 0) {
      addUXIssue('critical', 'Content Structure', 
        'No main page title found', 
        'Add a clear, accessible main title (h1) to help users understand the page content');
    } else {
      const titleText = await title.first().textContent();
      if (!titleText || titleText.trim().length < 3) {
        addUXIssue('medium', 'Content Structure', 
          'Page title is too short or empty', 
          'Ensure the main title is descriptive and informative');
      }
    }

    // Check for blog posts
    const postsCount = await blogPosts.count();
    console.log(`Found ${postsCount} blog posts`);
    
    if (postsCount === 0) {
      addUXIssue('critical', 'Content', 
        'No blog posts found on the blog page', 
        'Ensure blog posts are properly loaded and displayed');
    }

    // Test navigation and interactions
    if (postsCount > 0) {
      // Test clicking on first blog post
      const firstPost = blogPosts.first();
      const firstPostLink = firstPost.locator('a').first();
      
      if (await firstPostLink.count() > 0) {
        // Check if link has proper hover states
        await firstPostLink.hover();
        await page.screenshot({ 
          path: 'test-results/blog-desktop-hover.png' 
        });

        // Test if link is accessible
        const linkText = await firstPostLink.textContent();
        if (!linkText || linkText.trim().length === 0) {
          addUXIssue('high', 'Accessibility', 
            'Blog post link has no accessible text', 
            'Ensure all links have descriptive text or proper aria-labels');
        }

        // Check if clicking works (test in new context to avoid navigation)
        const href = await firstPostLink.getAttribute('href');
        if (href) {
          console.log(`Testing blog post link: ${href}`);
          
          // Open link in new page to test
          const newPage = await page.context().newPage();
          try {
            await newPage.goto(`http://localhost:4321${href}`);
            await newPage.waitForLoadState('networkidle');
            
            // Take screenshot of individual blog post
            await newPage.screenshot({ 
              path: 'test-results/blog-post-desktop.png', 
              fullPage: true 
            });
            
            await newPage.close();
          } catch (error) {
            addUXIssue('critical', 'Navigation', 
              `Blog post link is broken: ${href}`, 
              'Fix broken blog post links to ensure proper navigation');
          }
        }
      } else {
        addUXIssue('high', 'Usability', 
          'Blog posts are not clickable', 
          'Make blog posts clickable to improve user interaction');
      }
    }

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus').count();
    if (focusedElement === 0) {
      addUXIssue('high', 'Accessibility', 
        'No keyboard navigation support detected', 
        'Ensure all interactive elements are keyboard accessible');
    }

    // Check for loading states
    const loadingElements = await page.locator('.loading, .spinner, [data-loading]').count();
    if (loadingElements > 0) {
      addUXIssue('medium', 'UX Feedback', 
        'Loading states are visible after page load', 
        'Ensure loading indicators are properly hidden after content loads');
    }

    // Check for error states
    const errorElements = await page.locator('.error, .not-found, [data-error]').count();
    if (errorElements > 0) {
      addUXIssue('high', 'Error Handling', 
        'Error states are visible on the page', 
        'Handle and display errors gracefully to users');
    }
  });

  test('Mobile Responsiveness - iPhone', async ({ page, browserName }) => {
    // Use iPhone viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    console.log('Testing mobile responsiveness on iPhone viewport...');

    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/blog-mobile-iphone.png', 
      fullPage: true 
    });

    // Check for horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    if (bodyWidth > viewportWidth) {
      addUXIssue('high', 'Mobile Responsiveness', 
        `Horizontal scroll detected: body width ${bodyWidth}px > viewport ${viewportWidth}px`, 
        'Remove horizontal scroll by fixing responsive layout');
    }

    // Check if text is readable (not too small)
    const smallText = await page.locator('*').evaluateAll((elements) => {
      return elements.filter(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        return fontSize < 14 && el.textContent && el.textContent.trim().length > 0;
      }).length;
    });

    if (smallText > 0) {
      addUXIssue('medium', 'Mobile Readability', 
        `Found ${smallText} elements with text smaller than 14px`, 
        'Ensure text is at least 14px on mobile for better readability');
    }

    // Test touch interactions
    const blogPosts = page.locator('article, .blog-post, .post, [data-testid="blog-post"]');
    const postsCount = await blogPosts.count();
    
    if (postsCount > 0) {
      const firstPost = blogPosts.first();
      
      // Check if touch targets are large enough (44px minimum)
      const touchTargets = await firstPost.locator('a, button').evaluateAll((elements) => {
        return elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        }).length;
      });

      if (touchTargets > 0) {
        addUXIssue('medium', 'Mobile Usability', 
          `Found ${touchTargets} touch targets smaller than 44px`, 
          'Ensure touch targets are at least 44px for comfortable mobile interaction');
      }

      // Test tap interaction
      await firstPost.tap();
      await page.waitForTimeout(500);
    }
  });

  test('Mobile Responsiveness - Android', async ({ page }) => {
    // Use Pixel 5 viewport
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    console.log('Testing mobile responsiveness on Android viewport...');

    // Take Android screenshot
    await page.screenshot({ 
      path: 'test-results/blog-mobile-android.png', 
      fullPage: true 
    });

    // Similar checks as iPhone but for Android viewport
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    if (bodyWidth > viewportWidth) {
      addUXIssue('high', 'Mobile Responsiveness', 
        `Android: Horizontal scroll detected: body width ${bodyWidth}px > viewport ${viewportWidth}px`, 
        'Remove horizontal scroll by fixing responsive layout for Android devices');
    }
  });

  test('Performance and Core Web Vitals', async ({ page }) => {
    console.log('Analyzing performance and Core Web Vitals...');
    
    // Enable performance monitoring
    await page.goto('/blog');
    
    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (approximate)
        new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          if (firstInput) {
            vitals.fid = firstInput.processingStart - firstInput.startTime;
          }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value;
            }
          }
          vitals.cls = cls;
        }).observe({ entryTypes: ['layout-shift'] });

        // Give it some time to collect metrics
        setTimeout(() => resolve(vitals), 3000);
      });
    });

    console.log('Core Web Vitals:', vitals);

    // Check LCP (should be < 2.5s)
    if ((vitals as any).lcp > 2500) {
      addUXIssue('high', 'Performance', 
        `Largest Contentful Paint is ${(vitals as any).lcp}ms`, 
        'Optimize LCP to under 2.5 seconds by optimizing images and critical resources');
    }

    // Check CLS (should be < 0.1)
    if ((vitals as any).cls > 0.1) {
      addUXIssue('medium', 'Performance', 
        `Cumulative Layout Shift is ${(vitals as any).cls}`, 
        'Reduce layout shifts by setting dimensions for images and avoiding dynamic content insertion');
    }

    // Check FID (should be < 100ms)
    if ((vitals as any).fid > 100) {
      addUXIssue('medium', 'Performance', 
        `First Input Delay is ${(vitals as any).fid}ms`, 
        'Improve FID by optimizing JavaScript execution and reducing main thread blocking');
    }
  });

  test('Accessibility Analysis', async ({ page }) => {
    console.log('Running accessibility analysis...');
    
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for basic accessibility issues
    
    // 1. Check for heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('Found headings:', headings);
    
    const h1Count = await page.locator('h1').count();
    if (h1Count === 0) {
      addUXIssue('high', 'Accessibility', 
        'No h1 heading found on the page', 
        'Add a main h1 heading for proper document structure and screen reader navigation');
    } else if (h1Count > 1) {
      addUXIssue('medium', 'Accessibility', 
        `Multiple h1 headings found (${h1Count})`, 
        'Use only one h1 per page for proper heading hierarchy');
    }

    // 2. Check for images without alt text
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    const imagesWithEmptyAlt = await page.locator('img[alt=""]').count();
    
    if (imagesWithoutAlt > 0) {
      addUXIssue('high', 'Accessibility', 
        `Found ${imagesWithoutAlt} images without alt attributes`, 
        'Add descriptive alt text to all images for screen reader users');
    }

    // 3. Check for proper color contrast (basic check)
    const lowContrastElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let count = 0;
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        
        // Basic contrast check (simplified)
        if (color && backgroundColor && 
            color.includes('rgb') && backgroundColor.includes('rgb')) {
          // This is a very basic check - in reality you'd need more sophisticated contrast calculation
          const colorValues = color.match(/\d+/g);
          const bgValues = backgroundColor.match(/\d+/g);
          
          if (colorValues && bgValues) {
            const colorLuminance = (parseInt(colorValues[0]) + parseInt(colorValues[1]) + parseInt(colorValues[2])) / 3;
            const bgLuminance = (parseInt(bgValues[0]) + parseInt(bgValues[1]) + parseInt(bgValues[2])) / 3;
            
            const contrast = Math.abs(colorLuminance - bgLuminance);
            if (contrast < 50) { // Very basic threshold
              count++;
            }
          }
        }
      });
      
      return count;
    });

    if (lowContrastElements > 0) {
      addUXIssue('medium', 'Accessibility', 
        `Potential low contrast detected on ${lowContrastElements} elements`, 
        'Ensure sufficient color contrast (4.5:1 ratio for normal text) for better accessibility');
    }

    // 4. Check for interactive elements without proper labels
    const unlabeledInputs = await page.locator('input:not([aria-label]):not([aria-labelledby]):not([title])').count();
    if (unlabeledInputs > 0) {
      addUXIssue('high', 'Accessibility', 
        `Found ${unlabeledInputs} form inputs without proper labels`, 
        'Add proper labels, aria-label, or aria-labelledby to all form inputs');
    }

    // 5. Check for keyboard navigation support
    await page.keyboard.press('Tab');
    const focusVisible = await page.evaluate(() => {
      const focused = document.activeElement;
      return focused && focused !== document.body;
    });

    if (!focusVisible) {
      addUXIssue('high', 'Accessibility', 
        'No visible keyboard focus detected', 
        'Ensure all interactive elements have visible focus indicators for keyboard users');
    }
  });

  test.afterAll(async ({}) => {
    // Generate UX report
    console.log('\n' + '='.repeat(80));
    console.log('                     UX ANALYSIS REPORT');
    console.log('='.repeat(80));
    
    if (uxIssues.length === 0) {
      console.log('\n✅ No UX issues detected! Great job!');
    } else {
      // Sort issues by severity
      const severityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
      uxIssues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

      console.log(`\n📋 Found ${uxIssues.length} UX issues:\n`);

      const groupedIssues = uxIssues.reduce((groups, issue) => {
        const key = `${issue.severity}-${issue.category}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(issue);
        return groups;
      }, {} as Record<string, typeof uxIssues>);

      Object.entries(groupedIssues).forEach(([key, issues]) => {
        const [severity, category] = key.split('-');
        const icon = severity === 'critical' ? '🚨' : 
                    severity === 'high' ? '⚠️' : 
                    severity === 'medium' ? '⚡' : '💡';
        
        console.log(`${icon} ${severity.toUpperCase()} - ${category}`);
        console.log('-'.repeat(50));
        
        issues.forEach((issue, index) => {
          console.log(`${index + 1}. Issue: ${issue.issue}`);
          if (issue.element) {
            console.log(`   Element: ${issue.element}`);
          }
          console.log(`   Recommendation: ${issue.recommendation}\n`);
        });
      });

      // Summary by severity
      const severityCounts = uxIssues.reduce((counts, issue) => {
        counts[issue.severity] = (counts[issue.severity] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);

      console.log('\n📊 SUMMARY BY SEVERITY:');
      console.log(`🚨 Critical: ${severityCounts.critical || 0}`);
      console.log(`⚠️ High: ${severityCounts.high || 0}`);
      console.log(`⚡ Medium: ${severityCounts.medium || 0}`);
      console.log(`💡 Low: ${severityCounts.low || 0}`);

      // Priority recommendations
      const criticalIssues = uxIssues.filter(issue => issue.severity === 'critical');
      const highIssues = uxIssues.filter(issue => issue.severity === 'high');

      if (criticalIssues.length > 0 || highIssues.length > 0) {
        console.log('\n🎯 TOP PRIORITY FIXES:');
        [...criticalIssues, ...highIssues].slice(0, 5).forEach((issue, index) => {
          console.log(`${index + 1}. [${issue.severity.toUpperCase()}] ${issue.issue}`);
          console.log(`   → ${issue.recommendation}\n`);
        });
      }
    }

    console.log('\n📁 Screenshots saved to:');
    console.log('   - test-results/blog-desktop-initial.png');
    console.log('   - test-results/blog-desktop-hover.png');
    console.log('   - test-results/blog-mobile-iphone.png');
    console.log('   - test-results/blog-mobile-android.png');
    console.log('   - test-results/blog-post-desktop.png');
    
    console.log('\n' + '='.repeat(80));
  });
});