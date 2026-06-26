<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OpelToolsSeeder extends Seeder
{
    public function run(): void
    {
        // Brands
        $brands = collect([
            'Opel Tools', 'Bosch', 'Stanley', 'DeWalt', 'Makita', 'Hilti', 'Taparia', 'Gedore',
        ])->map(fn ($name) => Brand::firstOrCreate(
            ['slug' => Str::slug($name)],
            ['name' => $name, 'is_active' => true]
        ));

        // Categories
        $catData = [
            'Hand Tools', 'Power Tools', 'Cutting Tools', 'Measuring Instruments',
            'Fasteners & Anchors', 'Safety Equipment', 'Abrasives', 'Electrical Tools',
        ];
        $categories = collect($catData)->map(fn ($name) => Category::firstOrCreate(
            ['slug' => Str::slug($name)],
            ['name' => $name, 'is_active' => true]
        ));

        // Products — pass arrays directly; model casts handle JSON encoding
        $products = [
            [
                'name'              => 'Combination Spanner Set 8-22mm (12 Pcs)',
                'part_no'           => 'OT-CSS-8822',
                'brand'             => 'Opel Tools',
                'category'          => 'Hand Tools',
                'mrp'               => 1850.00,
                'selling_price'     => 1399.00,
                'current_stock'     => 45,
                'seller_stock'      => 0,
                'description'       => 'Chrome vanadium steel combination spanner set for professional use. Includes 12 spanners ranging from 8mm to 22mm. Polished finish for corrosion resistance.',
                'specifications'    => ['Material' => 'Chrome Vanadium Steel', 'Finish' => 'Mirror Polish', 'Size Range' => '8mm–22mm', 'Pieces' => '12'],
                'features'          => ['12 piece set 8-22mm', 'Chrome vanadium steel', 'Mirror polished finish', 'Comes with roll-up pouch'],
                'warranty'          => '1 Year Manufacturer Warranty',
                'usage_application' => 'Ideal for automotive, industrial, and general mechanical work.',
            ],
            [
                'name'              => 'Digital Vernier Caliper 150mm Stainless Steel',
                'part_no'           => 'OT-DVC-150',
                'brand'             => 'Opel Tools',
                'category'          => 'Measuring Instruments',
                'mrp'               => 899.00,
                'selling_price'     => 649.00,
                'current_stock'     => 30,
                'seller_stock'      => 0,
                'description'       => 'High precision digital vernier caliper with LCD display. Measures internal, external, depth, and step dimensions.',
                'specifications'    => ['Range' => '0–150mm / 0–6 inch', 'Resolution' => '0.01mm', 'Accuracy' => '±0.02mm', 'Battery' => 'LR44 x 1'],
                'features'          => ['LCD digital display', 'Inch/mm conversion', 'Zero at any position', 'Stainless steel construction'],
                'warranty'          => '6 Months Warranty',
                'usage_application' => 'Engineering, machining, quality control, and precision measurement.',
            ],
            [
                'name'              => 'Bosch GSB 550W Impact Drill',
                'part_no'           => 'BSH-GSB-550',
                'brand'             => 'Bosch',
                'category'          => 'Power Tools',
                'mrp'               => 4500.00,
                'selling_price'     => 3299.00,
                'current_stock'     => 18,
                'seller_stock'      => 0,
                'description'       => 'Bosch GSB 550W corded impact drill with keyless chuck. Suitable for drilling into concrete, wood, and steel.',
                'specifications'    => ['Power' => '550W', 'No-load Speed' => '2800 RPM', 'Chuck Size' => '13mm Keyless', 'Weight' => '1.5 kg'],
                'features'          => ['Variable speed trigger', 'Impact function for masonry', 'Keyless chuck', 'Ergonomic grip'],
                'warranty'          => '1 Year Bosch Warranty',
                'usage_application' => 'Construction, carpentry, metalworking, DIY.',
            ],
            [
                'name'              => 'Stanley FatMax 25mm Retractable Tape Measure 8m',
                'part_no'           => 'STL-FM-008',
                'brand'             => 'Stanley',
                'category'          => 'Measuring Instruments',
                'mrp'               => 699.00,
                'selling_price'     => 549.00,
                'current_stock'     => 60,
                'seller_stock'      => 0,
                'description'       => 'Stanley FatMax 8m tape measure with 25mm wide blade for extra rigidity and standout.',
                'specifications'    => ['Length' => '8m / 26ft', 'Blade Width' => '25mm', 'Standout' => '3.5m', 'Blade' => 'Mylar coated'],
                'features'          => ['Bi-material case', 'SureLock locking system', '25mm wide blade for long standout', 'Mylar protective coating'],
                'warranty'          => '2 Year Stanley Warranty',
            ],
            [
                'name'              => 'Makita DTD153 18V Cordless Impact Driver (Bare)',
                'part_no'           => 'MKT-DTD153Z',
                'brand'             => 'Makita',
                'category'          => 'Power Tools',
                'mrp'               => 8500.00,
                'selling_price'     => 7199.00,
                'current_stock'     => 12,
                'seller_stock'      => 0,
                'description'       => 'Makita DTD153 18V LXT cordless impact driver with brushless motor. Compact and lightweight for extended use.',
                'specifications'    => ['Voltage' => '18V LXT', 'Max Torque' => '165Nm', 'IPM' => '3500', 'Weight' => '1.1 kg (bare)'],
                'features'          => ['Brushless motor for longer runtime', 'Compact 133mm body length', 'LED job light', 'Star Protection Technology'],
                'warranty'          => '3 Year Makita Warranty',
                'usage_application' => 'Screw driving, fastening in construction and woodworking.',
            ],
            [
                'name'              => 'Safety Helmet EN397 Hard Hat White',
                'part_no'           => 'OT-SH-WH01',
                'brand'             => 'Opel Tools',
                'category'          => 'Safety Equipment',
                'mrp'               => 350.00,
                'selling_price'     => 249.00,
                'current_stock'     => 120,
                'seller_stock'      => 0,
                'description'       => 'EN397 certified safety helmet with adjustable ratchet suspension. Ventilated design for comfort on the job.',
                'specifications'    => ['Standard' => 'EN397', 'Material' => 'HDPE', 'Suspension' => 'Ratchet adjustable', 'Size' => '53–62cm'],
                'features'          => ['EN397 certified', 'Adjustable ratchet suspension', 'Ventilation slots', 'Sweat-absorbing inner lining'],
                'warranty'          => '1 Year Warranty',
                'usage_application' => 'Construction, manufacturing, utilities, site safety.',
            ],
            [
                'name'              => 'DeWalt DWMT73804 108-Piece Mechanics Tool Set',
                'part_no'           => 'DWT-DWMT73804',
                'brand'             => 'DeWalt',
                'category'          => 'Hand Tools',
                'mrp'               => 12500.00,
                'selling_price'     => 9999.00,
                'current_stock'     => 8,
                'seller_stock'      => 0,
                'description'       => 'Complete 108-piece mechanics tool set with ratchets, sockets, wrenches, and more. Comes in a sturdy blow-moulded case.',
                'specifications'    => ['Pieces' => '108', 'Drive Sizes' => '1/4", 3/8", 1/2"', 'Material' => 'Chrome Vanadium', 'Case' => 'Blow-moulded'],
                'features'          => ['108 piece complete set', 'Multiple drive sizes', 'Quick-release ratchets', 'Blow-moulded storage case'],
                'warranty'          => 'Lifetime Warranty',
                'usage_application' => 'Automotive repair, industrial maintenance, professional workshop use.',
            ],
            [
                'name'              => 'Angle Grinder 4.5 inch 850W with Guard',
                'part_no'           => 'OT-AG-4585',
                'brand'             => 'Opel Tools',
                'category'          => 'Cutting Tools',
                'mrp'               => 2200.00,
                'selling_price'     => 1749.00,
                'current_stock'     => 25,
                'seller_stock'      => 0,
                'description'       => '850W angle grinder for cutting, grinding, and polishing. Safety guard included. Compatible with 4.5 inch discs.',
                'specifications'    => ['Power' => '850W', 'Disc Size' => '115mm (4.5 inch)', 'No-load Speed' => '11000 RPM', 'Spindle Thread' => 'M14'],
                'features'          => ['850W powerful motor', 'Spindle lock for easy disc change', 'Safety guard included', 'Side handle for better control'],
                'warranty'          => '1 Year Warranty',
                'usage_application' => 'Metal cutting, grinding, surface preparation.',
            ],
            [
                'name'              => 'Taparia Combination Plier 8 inch Chrome Finish',
                'part_no'           => 'TAP-CP-200',
                'brand'             => 'Taparia',
                'category'          => 'Hand Tools',
                'mrp'               => 280.00,
                'selling_price'     => 210.00,
                'current_stock'     => 200,
                'seller_stock'      => 0,
                'description'       => 'Taparia combination plier made from forged alloy steel with chrome finish. Precision machined serrated jaws.',
                'specifications'    => ['Length' => '200mm (8 inch)', 'Material' => 'Forged Alloy Steel', 'Finish' => 'Chrome Plated', 'Standard' => 'IS 3656'],
                'features'          => ['Forged alloy steel', 'Chrome plated finish', 'Precision machined jaws', 'IS 3656 standard'],
                'warranty'          => '6 Month Warranty',
            ],
            [
                'name'              => 'Flap Disc 115mm Zirconia 40 Grit Pack of 10',
                'part_no'           => 'OT-FD-40GR',
                'brand'             => 'Opel Tools',
                'category'          => 'Abrasives',
                'mrp'               => 750.00,
                'selling_price'     => 549.00,
                'current_stock'     => 150,
                'seller_stock'      => 0,
                'description'       => 'Zirconia alumina flap discs for fast metal removal and fine finishing. Pack of 10. Fit standard 4.5 inch angle grinders.',
                'specifications'    => ['Diameter' => '115mm (4.5 inch)', 'Grit' => '40', 'Material' => 'Zirconia Alumina', 'Pack' => '10 pieces'],
                'features'          => ['Zirconia alumina for long life', 'Fast stock removal', 'Suitable for steel and stainless', 'Pack of 10'],
            ],
        ];

        // Truncate existing products for clean re-seed
        Product::truncate();

        foreach ($products as $data) {
            $brand    = $brands->firstWhere('name', $data['brand']);
            $category = $categories->firstWhere('name', $data['category']);
            $slug     = Str::slug($data['name']);

            Product::create([
                'name'              => $data['name'],
                'slug'              => $slug,
                'part_no'           => $data['part_no'],
                'brand_id'          => $brand?->id,
                'category_id'       => $category?->id,
                'mrp'               => $data['mrp'],
                'selling_price'     => $data['selling_price'],
                'current_stock'     => $data['current_stock'],
                'seller_stock'      => $data['seller_stock'],
                'description'       => $data['description'] ?? null,
                'specifications'    => $data['specifications'] ?? null,
                'features'          => $data['features'] ?? null,
                'warranty'          => $data['warranty'] ?? null,
                'usage_application' => $data['usage_application'] ?? null,
                'is_active'         => true,
            ]);
        }

        $this->command->info('Opel Tools sample data seeded successfully — ' . count($products) . ' products.');
    }
}
