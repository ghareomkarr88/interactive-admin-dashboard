/*
    Project: Interactive Dashboard (Admin Panel)
    Author: Omkar R. Ghare
    Designation: Front-End Web Developer
    Email: ghareomkarr88@gmail.com

    © 2026 Omkar R. Ghare. All rights reserved.
*/

// ==================== APPLICATION MODULE ====================
    const DashboardApp = (() => {
        'use strict';

        // ==================== STATE ====================
        const state = {
            theme: localStorage.getItem('dashboard-theme') || 'light',
            sidebarCollapsed: false,
            currentPage: 1,
            itemsPerPage: 8,
            sortColumn: null,
            sortDirection: 'asc',
            calendarDate: new Date(),
            transactions: [],
            allTransactions: [],
        };

        // ==================== MOCK DATA ====================
        const mockTransactions = [
            { id: 1, name: 'Aanya Desai', email: 'aanya.desai@example.com', amount: 79, status: 'active', date: '2026-10-20', method: 'Visa', color: '#0f766e' },
            { id: 2, name: 'Vikram Shah', email: 'vikram.shah@example.com', amount: 46, status: 'pending', date: '2026-10-20', method: 'PayPal', color: '#2563eb' },
            { id: 3, name: 'Meera Iyer', email: 'meera.iyer@example.com', amount: 129, status: 'completed', date: '2026-10-19', method: 'Mastercard', color: '#c2410c' },
            { id: 4, name: 'Kabir Nair', email: 'kabir.nair@example.com', amount: 34, status: 'completed', date: '2026-10-19', method: 'Apple Pay', color: '#475569' },
            { id: 5, name: 'Riya Kulkarni', email: 'riya.kulkarni@example.com', amount: 142, status: 'active', date: '2026-10-18', method: 'Visa', color: '#7c3aed' },
            { id: 6, name: 'Noah Bennett', email: 'noah.bennett@example.com', amount: 55, status: 'pending', date: '2026-10-18', method: 'PayPal', color: '#0891b2' },
            { id: 7, name: 'Anika Rao', email: 'anika.rao@example.com', amount: 89, status: 'completed', date: '2026-10-17', method: 'Mastercard', color: '#be123c' },
            { id: 8, name: 'Ethan Brooks', email: 'ethan.brooks@example.com', amount: 178, status: 'completed', date: '2026-10-17', method: 'Visa', color: '#4d7c0f' },
            { id: 9, name: 'Tara Menon', email: 'tara.menon@example.com', amount: 39, status: 'active', date: '2026-10-16', method: 'Apple Pay', color: '#a21caf' },
            { id: 10, name: 'Arjun Patel', email: 'arjun.patel@example.com', amount: 96, status: 'completed', date: '2026-10-15', method: 'Visa', color: '#1d4ed8' },
            { id: 11, name: 'Maya Joshi', email: 'maya.joshi@example.com', amount: 24, status: 'inactive', date: '2026-10-14', method: 'PayPal', color: '#b45309' },
            { id: 12, name: 'Dev Shah', email: 'dev.shah@example.com', amount: 159, status: 'pending', date: '2026-10-13', method: 'Mastercard', color: '#047857' },
            { id: 13, name: 'Nikhil Rao', email: 'nikhil.rao@example.com', amount: 64, status: 'completed', date: '2026-10-12', method: 'Visa', color: '#9333ea' },
            { id: 14, name: 'Zoe Miller', email: 'zoe.miller@example.com', amount: 109, status: 'active', date: '2026-10-10', method: 'Apple Pay', color: '#be185d' },
            { id: 15, name: 'Priya Mehta', email: 'priya.mehta@example.com', amount: 199, status: 'completed', date: '2026-10-08', method: 'Mastercard', color: '#0e7490' },
            { id: 16, name: 'Daniel Carter', email: 'daniel.carter@example.com', amount: 49, status: 'pending', date: '2026-10-05', method: 'PayPal', color: '#c026d3' },
        ];

        const activities = [
            { icon: '🛒', type: 'purple', title: 'Order placed', desc: 'Aanya Desai · #NS-4186 · $79.00', time: '2 min ago' },
            { icon: '📦', type: 'orange', title: 'Shipment dispatched', desc: '#NS-4182 is with the carrier', time: '18 min ago' },
            { icon: '💳', type: 'blue', title: 'Payment settled', desc: '$129.00 via Mastercard', time: '42 min ago' },
            { icon: '⭐', type: 'green', title: 'Product review received', desc: 'Wireless headphones · 5 stars', time: '1 hour ago' },
            { icon: '📉', type: 'red', title: 'Stock running low', desc: 'USB-C hub · 8 units left', time: '2 hours ago' },
            { icon: '📧', type: 'purple', title: 'Campaign sent', desc: 'The Weekend Edit · 486 subscribers', time: 'Yesterday' },
        ];

        const orders = [
            { icon: '🎧', name: 'Wireless headphones', id: '#NS-4186', amount: '$79.00', bg: 'rgba(99,102,241,0.1)' },
            { icon: '⌨️', name: 'Mechanical keyboard', id: '#NS-4185', amount: '$129.00', bg: 'rgba(16,185,129,0.1)' },
            { icon: '🔌', name: 'USB-C hub', id: '#NS-4184', amount: '$46.00', bg: 'rgba(245,158,11,0.1)' },
            { icon: '💡', name: 'Desk lamp', id: '#NS-4183', amount: '$55.00', bg: 'rgba(239,68,68,0.1)' },
            { icon: '🖱️', name: 'Wireless mouse', id: '#NS-4182', amount: '$34.00', bg: 'rgba(139,92,246,0.1)' },
        ];

        const notifications = [
            { icon: '🔔', title: 'New order received', desc: '#NS-4186 · Aanya Desai · $79.00', time: '2 min ago', unread: true, bg: 'rgba(99,102,241,0.1)' },
            { icon: '📦', title: 'Shipment dispatched', desc: '#NS-4182 is with the carrier', time: '18 min ago', unread: true, bg: 'rgba(16,185,129,0.1)' },
            { icon: '💳', title: 'Payment settled', desc: '$129.00 via Mastercard', time: '42 min ago', unread: true, bg: 'rgba(245,158,11,0.1)' },
            { icon: '⭐', title: 'New product review', desc: 'Wireless headphones · 5 stars', time: '1 hour ago', unread: false, bg: 'rgba(59,130,246,0.1)' },
            { icon: '📉', title: 'Low stock reminder', desc: 'USB-C hub · 8 units remaining', time: '2 hours ago', unread: true, bg: 'rgba(239,68,68,0.1)' },
            { icon: '📧', title: 'Campaign sent', desc: 'The Weekend Edit · 486 subscribers', time: 'Yesterday', unread: false, bg: 'rgba(139,92,246,0.1)' },
            { icon: '📊', title: 'Weekly report ready', desc: 'Store performance for Oct 12-18', time: 'Yesterday', unread: true, bg: 'rgba(99,102,241,0.1)' },
        ];

        const teamMembers = [
            { name: 'Priya Shah', role: 'Product Designer', status: 'online', tasks: 8, projects: 2, color: '#0f766e' },
            { name: 'Arjun Mehta', role: 'Frontend Engineer', status: 'online', tasks: 11, projects: 3, color: '#2563eb' },
            { name: 'Neha Kapoor', role: 'Store Operations', status: 'busy', tasks: 6, projects: 2, color: '#c2410c' },
            { name: 'Rohan Kulkarni', role: 'Customer Support', status: 'away', tasks: 9, projects: 1, color: '#7c3aed' },
        ];

        // ==================== DOM ELEMENTS ====================
        const $ = (sel) => document.querySelector(sel);
        const $$ = (sel) => document.querySelectorAll(sel);

        // ==================== PRELOADER ====================
        function hidePreloader() {
            setTimeout(() => {
                const preloader = $('#preloader');
                if (preloader) {
                    preloader.classList.add('hidden');
                    setTimeout(() => preloader.remove(), 600);
                }
            }, 2200);
        }

        // ==================== THEME ====================
        function initTheme() {
            document.documentElement.setAttribute('data-theme', state.theme);
            $('#themeToggle').addEventListener('click', toggleTheme);
        }

        function toggleTheme() {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('dashboard-theme', state.theme);
            updateChartsTheme();
        }

        function getChartTextColor() {
            return state.theme === 'dark' ? '#94a3b8' : '#64748b';
        }

        function getChartGridColor() {
            return state.theme === 'dark' ? 'rgba(30,48,80,0.5)' : 'rgba(226,232,240,0.8)';
        }

        // ==================== SIDEBAR ====================
        function initSidebar() {
            const collapseBtn = $('#collapseBtn');
            const hamburgerBtn = $('#hamburgerBtn');
            const sidebarOverlay = $('#sidebarOverlay');

            collapseBtn.addEventListener('click', () => {
                state.sidebarCollapsed = !state.sidebarCollapsed;
                $('#dashboardLayout').classList.toggle('sidebar-collapsed');
            });

            hamburgerBtn.addEventListener('click', () => {
                $('#sidebar').classList.toggle('mobile-open');
                sidebarOverlay.classList.toggle('active');
            });

            sidebarOverlay.addEventListener('click', () => {
                $('#sidebar').classList.remove('mobile-open');
                sidebarOverlay.classList.remove('active');
            });

            // Nav items
            $$('.nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    $$('.nav-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    // Close mobile sidebar
                    if (window.innerWidth <= 768) {
                        $('#sidebar').classList.remove('mobile-open');
                        sidebarOverlay.classList.remove('active');
                    }
                });
            });
        }

        // ==================== PROFILE DROPDOWN ====================
        function initProfileDropdown() {
            const dropdown = $('#profileDropdown');
            const btn = $('#profileBtn');

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        }

        // ==================== NOTIFICATION PANEL ====================
        function initNotifications() {
            const panel = $('#notificationPanel');
            const overlay = $('#notificationOverlay');
            const btn = $('#notificationBtn');
            const closeBtn = $('#notificationCloseBtn');
            const list = $('#notificationList');

            // Render notifications
            list.innerHTML = notifications.map(n => `
                <div class="notification-item ${n.unread ? 'unread' : ''}">
                    <div class="notification-item-icon" style="background: ${n.bg}">${n.icon}</div>
                    <div class="notification-item-content">
                        <div class="notification-item-title">${n.title}</div>
                        <div class="notification-item-desc">${n.desc}</div>
                        <div class="notification-item-time">${n.time}</div>
                    </div>
                </div>
            `).join('');

            btn.addEventListener('click', () => {
                panel.classList.add('open');
                overlay.classList.add('active');
            });

            const closePanel = () => {
                panel.classList.remove('open');
                overlay.classList.remove('active');
            };

            closeBtn.addEventListener('click', closePanel);
            overlay.addEventListener('click', closePanel);
        }

        // ==================== ANIMATED COUNTERS ====================
        function initCounters() {
            $$('.kpi-value[data-counter]').forEach(el => {
                const target = parseInt(el.dataset.counter);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);
                    el.textContent = prefix + current.toLocaleString() + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                }

                // Use Intersection Observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            requestAnimationFrame(update);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(el);
            });
        }

        // ==================== PROGRESS BARS ====================
        function initProgressBars() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        bar.style.width = bar.dataset.width;
                        observer.unobserve(bar);
                    }
                });
            }, { threshold: 0.3 });

            $$('.progress-bar-fill').forEach(bar => observer.observe(bar));
        }

        // ==================== SPARKLINE CHARTS ====================
        function createSparkline(canvasId, data, color) {
            const ctx = document.getElementById(canvasId);
            if (!ctx) return;
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((_, i) => i),
                    datasets: [{
                        data: data,
                        borderColor: color,
                        borderWidth: 2,
                        fill: true,
                        backgroundColor: color.replace('1)', '0.1)'),
                        pointRadius: 0,
                        tension: 0.4,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: { line: { borderWidth: 2 } }
                }
            });
        }

        // ==================== CHARTS ====================
        let revenueChart, trafficChart, performanceChart, weeklyChart, userGrowthChart, categoryChart;

        function initCharts() {
            const isDark = state.theme === 'dark';

            // Revenue Chart
            const revCtx = document.getElementById('revenueChart');
            if (revCtx) {
                revenueChart = new Chart(revCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                        datasets: [
                            {
                                label: 'Revenue',
                                data: [1680, 1940, 2210, 2060, 2475, 2630, 2880, 2940, 3200, 4460],
                                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                                borderRadius: 6,
                                borderSkipped: false,
                                barPercentage: 0.6,
                            },
                            {
                                label: 'Expenses',
                                data: [1120, 1260, 1480, 1320, 1650, 1730, 1890, 1950, 2110, 2680],
                                backgroundColor: 'rgba(139, 92, 246, 0.4)',
                                borderRadius: 6,
                                borderSkipped: false,
                                barPercentage: 0.6,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                align: 'end',
                                labels: {
                                    color: getChartTextColor(),
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 20,
                                    font: { size: 12, family: 'Inter' }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { color: getChartTextColor(), font: { size: 11, family: 'Inter' } }
                            },
                            y: {
                                grid: { color: getChartGridColor() },
                                ticks: {
                                    color: getChartTextColor(),
                                    font: { size: 11, family: 'Inter' },
                                    callback: (v) => '$' + (v / 1000) + 'k'
                                }
                            }
                        },
                        interaction: { mode: 'index', intersect: false }
                    }
                });
            }

            // Traffic Doughnut
            const trafCtx = document.getElementById('trafficChart');
            if (trafCtx) {
                trafficChart = new Chart(trafCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Direct', 'Organic', 'Social', 'Referral', 'Email'],
                        datasets: [{
                            data: [35, 28, 18, 12, 7],
                            backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
                            borderWidth: 0,
                            hoverOffset: 8,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '68%',
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: getChartTextColor(),
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 16,
                                    font: { size: 11, family: 'Inter' }
                                }
                            }
                        }
                    }
                });
            }

            // Performance Radar
            const perfCtx = document.getElementById('performanceChart');
            if (perfCtx) {
                performanceChart = new Chart(perfCtx, {
                    type: 'radar',
                    data: {
                        labels: ['Page speed', 'Fulfillment', 'Support', 'Checkout', 'Returns', 'Stock accuracy'],
                        datasets: [{
                            label: 'Current',
                            data: [88, 96, 91, 84, 87, 93],
                            borderColor: '#6366f1',
                            backgroundColor: 'rgba(99, 102, 241, 0.15)',
                            borderWidth: 2,
                            pointBackgroundColor: '#6366f1',
                            pointRadius: 4,
                        }, {
                            label: 'Previous',
                            data: [82, 92, 86, 79, 81, 88],
                            borderColor: '#8b5cf6',
                            backgroundColor: 'rgba(139, 92, 246, 0.08)',
                            borderWidth: 2,
                            pointBackgroundColor: '#8b5cf6',
                            pointRadius: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                ticks: { display: false, stepSize: 25 },
                                pointLabels: {
                                    color: getChartTextColor(),
                                    font: { size: 10, family: 'Inter' }
                                },
                                grid: { color: getChartGridColor() },
                                angleLines: { color: getChartGridColor() }
                            }
                        }
                    }
                });
            }

            // Weekly Bar
            const weekCtx = document.getElementById('weeklyChart');
            if (weekCtx) {
                weeklyChart = new Chart(weekCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Activity',
                            data: [18, 24, 21, 29, 34, 20, 15],
                            backgroundColor: [
                                'rgba(99, 102, 241, 0.7)',
                                'rgba(139, 92, 246, 0.7)',
                                'rgba(99, 102, 241, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(139, 92, 246, 0.7)',
                                'rgba(245, 158, 11, 0.7)',
                                'rgba(99, 102, 241, 0.7)',
                            ],
                            borderRadius: 8,
                            borderSkipped: false,
                            barPercentage: 0.5,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { color: getChartTextColor(), font: { size: 10, family: 'Inter' } }
                            },
                            y: {
                                grid: { color: getChartGridColor() },
                                ticks: { display: false }
                            }
                        }
                    }
                });
            }

            // User Growth Line
            const ugCtx = document.getElementById('userGrowthChart');
            if (ugCtx) {
                userGrowthChart = new Chart(ugCtx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                        datasets: [
                            {
                                label: 'New Users',
                                data: [25, 32, 41, 38, 47, 56, 64, 72, 83, 96],
                                borderColor: '#6366f1',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                fill: true,
                                tension: 0.4,
                                borderWidth: 2,
                                pointRadius: 3,
                                pointBackgroundColor: '#6366f1',
                            },
                            {
                                label: 'Returning Users',
                                data: [18, 22, 29, 32, 38, 46, 52, 58, 68, 76],
                                borderColor: '#10b981',
                                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                fill: true,
                                tension: 0.4,
                                borderWidth: 2,
                                pointRadius: 3,
                                pointBackgroundColor: '#10b981',
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                align: 'end',
                                labels: {
                                    color: getChartTextColor(),
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 20,
                                    font: { size: 11, family: 'Inter' }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { color: getChartTextColor(), font: { size: 11, family: 'Inter' } }
                            },
                            y: {
                                grid: { color: getChartGridColor() },
                                ticks: {
                                    color: getChartTextColor(),
                                    font: { size: 11, family: 'Inter' },
                                    callback: (v) => (v / 1000).toFixed(1) + 'k'
                                }
                            }
                        },
                        interaction: { mode: 'index', intersect: false }
                    }
                });
            }

            // Category Polar Area
            const catCtx = document.getElementById('categoryChart');
            if (catCtx) {
                categoryChart = new Chart(catCtx, {
                    type: 'polarArea',
                    data: {
                        labels: ['Audio', 'Computer accessories', 'Mobile', 'Home office', 'Other'],
                        datasets: [{
                            data: [32, 26, 18, 14, 10],
                            backgroundColor: [
                                'rgba(99, 102, 241, 0.7)',
                                'rgba(16, 185, 129, 0.7)',
                                'rgba(245, 158, 11, 0.7)',
                                'rgba(59, 130, 246, 0.7)',
                                'rgba(239, 68, 68, 0.7)',
                            ],
                            borderWidth: 0,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: getChartTextColor(),
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 16,
                                    font: { size: 11, family: 'Inter' }
                                }
                            }
                        },
                        scales: {
                            r: {
                                ticks: { display: false },
                                grid: { color: getChartGridColor() }
                            }
                        }
                    }
                });
            }

            // Sparklines
            createSparkline('sparkline1', [12, 14, 16, 15, 18, 19, 21, 22, 24, 28], 'rgba(99, 102, 241, 1)');
            createSparkline('sparkline2', [8, 10, 11, 12, 14, 15, 17, 18, 19, 21], 'rgba(16, 185, 129, 1)');
            createSparkline('sparkline3', [14, 16, 15, 18, 17, 20, 19, 22, 21, 24], 'rgba(245, 158, 11, 1)');
            createSparkline('sparkline4', [31, 33, 34, 35, 36, 37, 38, 39, 40, 41], 'rgba(139, 92, 246, 1)');
        }

        function updateChartsTheme() {
            const charts = [revenueChart, trafficChart, performanceChart, weeklyChart, userGrowthChart, categoryChart];
            charts.forEach(chart => {
                if (!chart) return;
                const opts = chart.options;

                // Update legend colors
                if (opts.plugins && opts.plugins.legend && opts.plugins.legend.labels) {
                    opts.plugins.legend.labels.color = getChartTextColor();
                }

                // Update scale colors
                if (opts.scales) {
                    Object.values(opts.scales).forEach(scale => {
                        if (scale.ticks) scale.ticks.color = getChartTextColor();
                        if (scale.grid) scale.grid.color = getChartGridColor();
                        if (scale.pointLabels) scale.pointLabels.color = getChartTextColor();
                        if (scale.angleLines) scale.angleLines.color = getChartGridColor();
                    });
                }

                chart.update('none');
            });
        }

        // ==================== DATA TABLE ====================
        function initTable() {
            state.allTransactions = [...mockTransactions];
            state.transactions = [...state.allTransactions];
            renderTable();
            initTableSort();
            initTableSearch();
        }

        function renderTable() {
            const tbody = $('#tableBody');
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            const pageData = state.transactions.slice(start, end);
            const total = state.transactions.length;
            const totalPages = Math.ceil(total / state.itemsPerPage);

            tbody.innerHTML = pageData.map(t => {
                const initials = t.name.split(' ').map(n => n[0]).join('');
                const statusClass = `status-${t.status}`;
                return `
                    <tr>
                        <td>
                            <div class="table-user">
                                <div class="table-user-avatar" style="background: ${t.color}">${initials}</div>
                                <div>
                                    <div class="table-user-name">${t.name}</div>
                                    <div class="table-user-email">${t.email}</div>
                                </div>
                            </div>
                        </td>
                        <td><strong>$${t.amount.toLocaleString()}</strong></td>
                        <td><span class="status-badge ${statusClass}">${t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span></td>
                        <td>${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td>${t.method}</td>
                    </tr>
                `;
            }).join('');

            // Table info
            $('#tableInfo').textContent = `Showing ${start + 1}-${Math.min(end, total)} of ${total} results`;

            // Pagination
            renderPagination(totalPages);
        }

        function renderPagination(totalPages) {
            const pagination = $('#pagination');
            let html = '';

            html += `<button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} data-page="prev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>`;

            const maxVisible = 5;
            let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
            let endPage = Math.min(totalPages, startPage + maxVisible - 1);
            if (endPage - startPage < maxVisible - 1) {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }

            if (startPage > 1) {
                html += `<button class="page-btn" data-page="1">1</button>`;
                if (startPage > 2) html += `<button class="page-btn" disabled>...</button>`;
            }

            for (let i = startPage; i <= endPage; i++) {
                html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += `<button class="page-btn" disabled>...</button>`;
                html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
            }

            html += `<button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} data-page="next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>`;

            pagination.innerHTML = html;

            // Page button events
            $$('.page-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = btn.dataset.page;
                    if (page === 'prev') state.currentPage = Math.max(1, state.currentPage - 1);
                    else if (page === 'next') state.currentPage = Math.min(totalPages, state.currentPage + 1);
                    else state.currentPage = parseInt(page);
                    renderTable();
                });
            });
        }

        function initTableSort() {
            $$('.data-table th[data-sort]').forEach(th => {
                th.addEventListener('click', () => {
                    const col = th.dataset.sort;
                    if (state.sortColumn === col) {
                        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
                    } else {
                        state.sortColumn = col;
                        state.sortDirection = 'asc';
                    }

                    // Remove sorted class from all
                    $$('.data-table th').forEach(h => h.classList.remove('sorted'));
                    th.classList.add('sorted');

                    state.transactions.sort((a, b) => {
                        let valA, valB;
                        switch (col) {
                            case 'name': valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); break;
                            case 'amount': valA = a.amount; valB = b.amount; break;
                            case 'status': valA = a.status; valB = b.status; break;
                            case 'date': valA = new Date(a.date); valB = new Date(b.date); break;
                            case 'method': valA = a.method; valB = b.method; break;
                            default: return 0;
                        }
                        if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
                        if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
                        return 0;
                    });

                    state.currentPage = 1;
                    renderTable();
                });
            });
        }

        function initTableSearch() {
            const input = $('#tableSearch');
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (query === '') {
                    state.transactions = [...state.allTransactions];
                } else {
                    state.transactions = state.allTransactions.filter(t =>
                        t.name.toLowerCase().includes(query) ||
                        t.email.toLowerCase().includes(query) ||
                        t.status.toLowerCase().includes(query) ||
                        t.method.toLowerCase().includes(query) ||
                        t.amount.toString().includes(query)
                    );
                }
                state.currentPage = 1;
                renderTable();
            });
        }

        // ==================== ACTIVITY ====================
        function initActivity() {
            const list = $('#activityList');
            list.innerHTML = activities.map(a => `
                <div class="activity-item">
                    <div class="activity-icon ${a.type}">${a.icon}</div>
                    <div class="activity-content">
                        <div class="activity-title">${a.title}</div>
                        <div class="activity-desc">${a.desc}</div>
                    </div>
                    <div class="activity-time">${a.time}</div>
                </div>
            `).join('');
        }

        // ==================== CALENDAR ====================
        function initCalendar() {
            renderCalendar();
            $('#calPrev').addEventListener('click', () => {
                state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
                renderCalendar();
            });
            $('#calNext').addEventListener('click', () => {
                state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
                renderCalendar();
            });
        }

        function renderCalendar() {
            const date = state.calendarDate;
            const year = date.getFullYear();
            const month = date.getMonth();
            const today = new Date();

            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            $('#calMonth').textContent = `${monthNames[month]} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();

            const eventDays = [5, 12, 15, 20, 25, 28];

            let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                .map(d => `<div class="calendar-day-label">${d}</div>`).join('');

            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
            }

            // Current month days
            for (let d = 1; d <= daysInMonth; d++) {
                const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const hasEvent = eventDays.includes(d);
                const classes = ['calendar-day'];
                if (isToday) classes.push('today');
                if (hasEvent) classes.push('has-event');
                html += `<div class="${classes.join(' ')}">${d}</div>`;
            }

            // Next month days
            const totalCells = firstDay + daysInMonth;
            const remaining = 42 - totalCells;
            for (let d = 1; d <= remaining; d++) {
                html += `<div class="calendar-day other-month">${d}</div>`;
            }

            $('#calendarGrid').innerHTML = html;
        }

        // ==================== ORDERS ====================
        function initOrders() {
            const list = $('#ordersList');
            list.innerHTML = orders.map(o => `
                <div class="order-item">
                    <div class="order-left">
                        <div class="order-thumb" style="background: ${o.bg}">${o.icon}</div>
                        <div class="order-info">
                            <div class="order-name">${o.name}</div>
                            <div class="order-id">${o.id}</div>
                        </div>
                    </div>
                    <div class="order-amount">${o.amount}</div>
                </div>
            `).join('');
        }

        // ==================== TEAM ====================
        function initTeam() {
            const grid = $('#teamGrid');
            grid.innerHTML = teamMembers.map((m, i) => {
                const initials = m.name.split(' ').map(n => n[0]).join('');
                return `
                    <div class="team-card animate-in delay-${6 + i}">
                        <div class="team-avatar ${m.status}" style="background: ${m.color}">${initials}</div>
                        <div class="team-name">${m.name}</div>
                        <div class="team-role-label">${m.role}</div>
                        <div class="team-stats">
                            <div class="team-stat">
                                <div class="team-stat-value">${m.tasks}</div>
                                <div class="team-stat-label">Tasks</div>
                            </div>
                            <div class="team-stat">
                                <div class="team-stat-value">${m.projects}</div>
                                <div class="team-stat-label">Projects</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // ==================== GLOBAL SEARCH ====================
        function initGlobalSearch() {
            const input = $('#globalSearch');
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                // Simple highlight / filter on nav items
                $$('.nav-item').forEach(item => {
                    const text = item.querySelector('.nav-item-text');
                    if (text) {
                        if (query === '' || text.textContent.toLowerCase().includes(query)) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
                // Also show all section titles
                $$('.nav-section-title').forEach(title => {
                    title.style.display = query === '' ? '' : 'none';
                });
            });
        }

        // ==================== CHART FILTER BUTTONS ====================
        function initChartFilters() {
            $$('.card-filter-btn[data-filter]').forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.parentElement.querySelectorAll('.card-filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Update chart data based on filter
                    const filter = btn.dataset.filter;
                    if (revenueChart) {
                        let labels, revenue, expenses;
                        if (filter === 'daily') {
                            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                            revenue = [110, 240, 180, 390, 320, 195, 135];
                            expenses = [70, 150, 115, 240, 205, 125, 90];
                        } else if (filter === 'weekly') {
                            labels = ['W1', 'W2', 'W3', 'W4'];
                            revenue = [920, 1080, 1140, 1320];
                            expenses = [570, 690, 720, 700];
                        } else {
                            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                            revenue = [1680, 1940, 2210, 2060, 2475, 2630, 2880, 2940, 3200, 4460];
                            expenses = [1120, 1260, 1480, 1320, 1650, 1730, 1890, 1950, 2110, 2680];
                        }
                        revenueChart.data.labels = labels;
                        revenueChart.data.datasets[0].data = revenue;
                        revenueChart.data.datasets[1].data = expenses;
                        revenueChart.update();
                    }
                });
            });
        }

        // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            $$('.animate-in').forEach(el => {
                el.style.animationPlayState = 'paused';
                observer.observe(el);
            });

            // Immediately play animations for elements already visible
            setTimeout(() => {
                $$('.animate-in').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.style.animationPlayState = 'running';
                    }
                });
            }, 100);
        }

        // ==================== INITIALIZE ====================
        function init() {
            hidePreloader();
            initTheme();
            initSidebar();
            initProfileDropdown();
            initNotifications();
            initGlobalSearch();

            // Wait for preloader to finish
            setTimeout(() => {
                initCounters();
                initProgressBars();
                initCharts();
                initTable();
                initActivity();
                initCalendar();
                initOrders();
                initTeam();
                initChartFilters();
                initScrollAnimations();
            }, 500);
        }

        // Boot
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        return { state, toggleTheme };
    })();
