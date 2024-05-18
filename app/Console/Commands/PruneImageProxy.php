<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PruneImageProxy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'prune:imageproxy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prune imageproxy images';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $images = $this->getDisk()->files('imgproxy');

        $this->getDisk()->delete($images);
        $count = count($images);

        $this->info("Deleted $count images");

        return 0;
    }

    private function getDisk()
    {
        return Storage::disk('public');
    }
}
