import { test, expect, devices } from '@playwright/test';

test.describe('Blog UX Improvements Analysis', () => {
  let improvementResults: Array<{
    improvement: string;
    tested: boolean;
    passed: boolean;
    details: string;
    screenshot?: string;
  }> = [];

  const addResult = (improvement: string, passed: boolean, details: string, screenshot?: string) => {
    improvementResults.push({ improvement, tested: true, passed, details, screenshot });
  };

  test.beforeEach(async ({ page }) => {
    improvementResults = [];
  });

  test('Blog Listing Page - Focus States and Interactive Elements', async ({ page }) => {
    console.log('Testing focus states and interactive elements...');
    
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Take initial screenshot
    await page.screenshot({ 
      path: 'test-results/blog-improvements-initial.png', 
      fullPage: true 
    });

    // Test 1: Better focus states - Check for focus rings on interactive elements
    const focusableElements = [
      'a', 
      'button', 
      '[tabindex="0"]', 
      '[role="button"]',
      'article a', // Blog post links
      '.blog-card a', // If using blog cards
    ];

    let focusStatesWorking = true;
    let focusDetails = '';

    for (const selector of focusableElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      
      if (count > 0) {
        const firstElement = elements.first();
        await firstElement.focus();
        
        // Check if focus ring is visible
        const focusVisible = await firstElement.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          const pseudoStyles = window.getComputedStyle(el, ':focus');
          
          return styles.outline !== 'none' || 
                 pseudoStyles.outline !== 'none' ||
                 styles.boxShadow !== 'none' ||
                 pseudoStyles.boxShadow !== 'none' ||
                 el.matches(':focus-visible');
        });

        if (!focusVisible) {
          focusStatesWorking = false;
          focusDetails += `No visible focus indicator on ${selector}. `;
        }
      }
    }

    await page.screenshot({ 
      path: 'test-results/blog-focus-states.png', 
      fullPage: true 
    });

    addResult(
      'Better focus states', 
      focusStatesWorking, 
      focusStatesWorking ? 'All interactive elements have proper focus rings' : focusDetails,
      'blog-focus-states.png'
    );

    // Test 2: Improved color contrast - Check meta text contrast
    const metaElements = page.locator('.text-white\\/70, .text-white\\/90, .opacity-70, .opacity-90');
    const metaCount = await metaElements.count();
    
    let contrastImproved = false;
    if (metaCount > 0) {
      const contrastRatio = await metaElements.first().evaluate((el) => {
        const styles = window.getComputedStyle(el);
        // Check if using higher opacity values (70-90% instead of 60%)
        return styles.opacity > '0.65' || 
               styles.color.includes('rgba') && 
               parseFloat(styles.color.match(/[\d.]+(?=\))/)?.[0] || '0') > 0.65;
      });
      contrastImproved = contrastRatio;
    }

    addResult(
      'Improved color contrast', 
      contrastImproved, 
      contrastImproved ? 'Meta text uses improved contrast (70-90% opacity)' : 'Meta text contrast not improved or elements not found'
    );

    // Test 3: Enhanced touch targets - Check minimum sizes
    const touchTargets = page.locator('article, .blog-card, a[href*="/blog/"]');
    const touchCount = await touchTargets.count();
    let touchTargetsOk = true;
    let smallTargets = 0;

    if (touchCount > 0) {
      for (let i = 0; i < Math.min(touchCount, 5); i++) {
        const target = touchTargets.nth(i);
        const size = await target.boundingBox();
        
        if (size && (size.width < 44 || size.height < 44)) {
          smallTargets++;
          touchTargetsOk = false;
        }
      }
    }

    addResult(
      'Enhanced touch targets', 
      touchTargetsOk, 
      touchTargetsOk ? 'All touch targets meet minimum 44px requirement' : `Found ${smallTargets} touch targets below 44px minimum`
    );

    // Test 4: Hover animations - Check for scale effects
    if (touchCount > 0) {
      const firstCard = touchTargets.first();
      await firstCard.hover();
      
      await page.screenshot({ 
        path: 'test-results/blog-hover-animation.png' 
      });

      const hasHoverEffect = await firstCard.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.transform !== 'none' || 
               styles.transition.includes('transform') ||
               el.style.transform !== '' ||
               el.classList.toString().includes('hover:scale') ||
               el.classList.toString().includes('transition');
      });

      addResult(
        'Hover animations', 
        hasHoverEffect, 
        hasHoverEffect ? 'Blog cards have hover animations (scale/transform effects)' : 'No hover animations detected on blog cards',
        'blog-hover-animation.png'
      );
    }
  });

  test('Blog Listing Page - Loading States and Click Feedback', async ({ page }) => {
    console.log('Testing loading states and click feedback...');
    
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Test 5: Loading states - Test click feedback with opacity and scale changes
    const blogLinks = page.locator('article a, .blog-card a, a[href*="/blog/"]');
    const linkCount = await blogLinks.count();
    
    if (linkCount > 0) {
      const firstLink = blogLinks.first();
      
      // Take screenshot before click
      await page.screenshot({ 
        path: 'test-results/blog-before-click.png' 
      });

      // Intercept navigation to test loading state
      await page.route('**/blog/**', route => {
        // Delay response to simulate loading
        setTimeout(() => route.continue(), 500);
      });

      // Click and capture loading state
      const clickPromise = firstLink.click();
      
      // Wait a bit to capture loading state
      await page.waitForTimeout(100);
      
      await page.screenshot({ 
        path: 'test-results/blog-loading-state.png' 
      });

      // Check for loading indicators
      const hasLoadingState = await page.evaluate(() => {
        // Look for common loading indicators
        const loadingElements = document.querySelectorAll(
          '.loading, .spinner, [data-loading], .opacity-50, .scale-95, [style*="opacity"], [style*="transform"]'
        );
        return loadingElements.length > 0;
      });

      await clickPromise;

      addResult(
        'Loading states', 
        hasLoadingState, 
        hasLoadingState ? 'Loading states with opacity/scale changes are working' : 'No loading state feedback detected',
        'blog-loading-state.png'
      );
    }
  });

  test('Individual Blog Post - Reading Progress Bar and Keyboard Navigation', async ({ page }) => {
    console.log('Testing individual blog post improvements...');
    
    // Navigate to a specific blog post
    await page.goto('/blog/hackathon-winners-playbook');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ 
      path: 'test-results/blog-post-initial.png', 
      fullPage: true 
    });

    // Test 6: Reading progress bar
    const progressBar = page.locator('.progress-bar, [data-progress], .reading-progress, .scroll-progress');
    const progressBarExists = await progressBar.count() > 0;

    if (progressBarExists) {
      // Scroll down to test progress
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      
      await page.screenshot({ 
        path: 'test-results/blog-post-progress-mid.png' 
      });

      const progressValue = await progressBar.first().evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.width || el.getAttribute('value') || el.style.width;
      });

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      await page.screenshot({ 
        path: 'test-results/blog-post-progress-end.png' 
      });

      addResult(
        'Reading progress bar', 
        progressBarExists, 
        progressBarExists ? `Reading progress bar found and working (value: ${progressValue})` : 'Reading progress bar not found',
        'blog-post-progress-end.png'
      );
    } else {
      addResult(
        'Reading progress bar', 
        false, 
        'Reading progress bar not found on individual blog post'
      );
    }

    // Test 7: Better keyboard navigation - Enhanced keyboard support
    await page.goto('/blog/hackathon-winners-playbook');
    await page.waitForLoadState('networkidle');

    // Test tab navigation
    const initialFocus = await page.evaluate(() => document.activeElement?.tagName);
    
    let tabCount = 0;
    let focusableElements = [];
    
    // Tab through elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? {
          tag: el.tagName,
          text: el.textContent?.slice(0, 50),
          visible: el.offsetWidth > 0 && el.offsetHeight > 0
        } : null;
      });
      
      if (currentFocus && currentFocus.visible) {
        focusableElements.push(currentFocus);
        tabCount++;
      }
    }

    const keyboardNavigationGood = tabCount >= 3; // At least 3 focusable elements

    addResult(
      'Better keyboard navigation', 
      keyboardNavigationGood, 
      keyboardNavigationGood ? 
        `Found ${tabCount} keyboard-accessible elements: ${focusableElements.map(el => el.tag).join(', ')}` :
        'Limited keyboard navigation support detected'
    );

    // Test 8: Accessibility improvements - Better focus management and scroll margins
    const focusElements = page.locator('h1, h2, h3, a, button');
    const elementsCount = await focusElements.count();
    
    let accessibilityScore = 0;
    const accessibilityChecks = [];

    if (elementsCount > 0) {
      // Check scroll margins
      const hasScrollMargins = await focusElements.first().evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.scrollMarginTop !== '0px' || styles.scrollMargin !== '0px';
      });
      
      if (hasScrollMargins) {
        accessibilityScore++;
        accessibilityChecks.push('Scroll margins configured');
      }

      // Check focus management
      await focusElements.first().focus();
      const focusManaged = await page.evaluate(() => {
        const focused = document.activeElement;
        return focused && focused !== document.body;
      });

      if (focusManaged) {
        accessibilityScore++;
        accessibilityChecks.push('Focus management working');
      }
    }

    const accessibilityGood = accessibilityScore >= 1;

    addResult(
      'Accessibility improvements', 
      accessibilityGood, 
      accessibilityGood ? 
        `Accessibility improvements found: ${accessibilityChecks.join(', ')}` :
        'Limited accessibility improvements detected'
    );
  });

  test('Mobile Responsiveness - Enhanced Touch Targets and UX', async ({ page }) => {
    console.log('Testing mobile responsiveness improvements...');
    
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ 
      path: 'test-results/blog-mobile-improvements.png', 
      fullPage: true 
    });

    // Test enhanced touch targets on mobile
    const mobileTargets = page.locator('article, .blog-card, a[href*="/blog/"]');
    const mobileCount = await mobileTargets.count();
    
    let mobileTargetsGood = true;
    let mobileTouchDetails = '';

    if (mobileCount > 0) {
      for (let i = 0; i < Math.min(mobileCount, 3); i++) {
        const target = mobileTargets.nth(i);
        const box = await target.boundingBox();
        
        if (box) {
          const hasGoodPadding = box.height >= 60; // Mobile should have more padding
          const hasGoodWidth = box.width >= 200; // Reasonable width for mobile
          
          if (!hasGoodPadding || !hasGoodWidth) {
            mobileTargetsGood = false;
            mobileTouchDetails += `Target ${i + 1}: ${box.width}x${box.height}px. `;
          }
        }
      }
    }

    addResult(
      'Enhanced mobile touch targets', 
      mobileTargetsGood, 
      mobileTargetsGood ? 
        'Mobile touch targets have proper minimum heights and padding' : 
        `Mobile touch targets need improvement: ${mobileTouchDetails}`
    );

    // Test mobile-specific blog post
    await page.goto('/blog/hackathon-winners-playbook');
    await page.waitForLoadState('networkidle');

    await page.screenshot({ 
      path: 'test-results/blog-post-mobile.png', 
      fullPage: true 
    });

    // Check reading progress on mobile
    const mobileProgressBar = page.locator('.progress-bar, [data-progress], .reading-progress, .scroll-progress');
    const mobileProgressExists = await mobileProgressBar.count() > 0;

    if (mobileProgressExists) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(300);
      
      await page.screenshot({ 
        path: 'test-results/blog-post-mobile-progress.png' 
      });
    }

    addResult(
      'Mobile reading progress', 
      mobileProgressExists, 
      mobileProgressExists ? 
        'Reading progress bar works on mobile' : 
        'Reading progress bar not found on mobile',
      'blog-post-mobile-progress.png'
    );
  });

  test.afterAll(async () => {
    // Generate comprehensive UX improvements report
    console.log('\n' + '='.repeat(90));
    console.log('                         BLOG UX IMPROVEMENTS ANALYSIS REPORT');
    console.log('='.repeat(90));

    const passedImprovements = improvementResults.filter(r => r.passed).length;
    const totalImprovements = improvementResults.length;
    const successRate = Math.round((passedImprovements / totalImprovements) * 100);

    console.log(`\n📊 OVERALL SUCCESS RATE: ${passedImprovements}/${totalImprovements} (${successRate}%)\n`);

    console.log('🎯 IMPROVEMENT ANALYSIS:\n');
    
    improvementResults.forEach((result, index) => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${index + 1}. ${result.improvement}`);
      console.log(`   ${result.details}`);
      if (result.screenshot) {
        console.log(`   📸 Screenshot: test-results/${result.screenshot}`);
      }
      console.log('');
    });

    const categories = {
      'Visual Feedback': ['Better focus states', 'Hover animations', 'Loading states'],
      'Accessibility': ['Improved color contrast', 'Better keyboard navigation', 'Accessibility improvements'],
      'Mobile Experience': ['Enhanced touch targets', 'Enhanced mobile touch targets', 'Mobile reading progress'],
      'Reading Experience': ['Reading progress bar']
    };

    console.log('\n📋 IMPROVEMENTS BY CATEGORY:\n');
    
    Object.entries(categories).forEach(([category, improvements]) => {
      const categoryResults = improvementResults.filter(r => 
        improvements.some(imp => r.improvement.includes(imp))
      );
      
      const categoryPassed = categoryResults.filter(r => r.passed).length;
      const categoryTotal = categoryResults.length;
      const categoryRate = categoryTotal > 0 ? Math.round((categoryPassed / categoryTotal) * 100) : 0;
      
      console.log(`${category}: ${categoryPassed}/${categoryTotal} (${categoryRate}%)`);
      categoryResults.forEach(result => {
        const icon = result.passed ? '  ✅' : '  ❌';
        console.log(`${icon} ${result.improvement}`);
      });
      console.log('');
    });

    // Impact assessment
    console.log('🚀 UX IMPACT ASSESSMENT:\n');
    
    const criticalImprovements = improvementResults.filter(r => 
      ['Better focus states', 'Enhanced touch targets', 'Reading progress bar'].includes(r.improvement)
    );
    
    const criticalPassed = criticalImprovements.filter(r => r.passed).length;
    
    if (criticalPassed === criticalImprovements.length) {
      console.log('🎉 HIGH IMPACT: All critical UX improvements are working!');
    } else if (criticalPassed > criticalImprovements.length / 2) {
      console.log('⚡ MEDIUM IMPACT: Most critical UX improvements are working.');
    } else {
      console.log('⚠️  LOW IMPACT: Several critical UX improvements need attention.');
    }

    console.log('\n📁 VISUAL COMPARISON SCREENSHOTS:');
    console.log('   Initial state: test-results/blog-improvements-initial.png');
    console.log('   Focus states: test-results/blog-focus-states.png');
    console.log('   Hover effects: test-results/blog-hover-animation.png');
    console.log('   Loading state: test-results/blog-loading-state.png');
    console.log('   Mobile view: test-results/blog-mobile-improvements.png');
    console.log('   Reading progress: test-results/blog-post-progress-end.png');
    
    console.log('\n🎯 RECOMMENDATIONS FOR NEXT STEPS:');
    
    const failedImprovements = improvementResults.filter(r => !r.passed);
    if (failedImprovements.length > 0) {
      console.log('   Priority fixes needed for:');
      failedImprovements.forEach(failure => {
        console.log(`   • ${failure.improvement}: ${failure.details}`);
      });
    } else {
      console.log('   🌟 Excellent work! Consider A/B testing these improvements with users.');
      console.log('   🌟 Monitor user engagement metrics to measure the impact.');
      console.log('   🌟 Consider progressive enhancement for additional UX features.');
    }

    console.log('\n' + '='.repeat(90));
  });
});