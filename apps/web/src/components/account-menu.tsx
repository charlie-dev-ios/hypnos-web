"use client";

import { Settings } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserSettings } from "@/hooks/use-user-settings";
import { POT_CAPACITY_PRESETS } from "@/lib/utils/calculator";

export function AccountMenu() {
  const { settings, setSettings, resetSettings, isLoaded } = useUserSettings();

  const handleRankChange = (value: number | null) => {
    setSettings({ rank: value });
    toast.success("ランク設定を保存しました");
  };

  const handlePotCapacityChange = (value: number | null) => {
    setSettings({ potCapacity: value });
    toast.success("鍋容量設定を保存しました");
  };

  const handleReset = () => {
    resetSettings();
    toast.success("設定をリセットしました");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="設定">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
          <DialogDescription>
            デフォルトの設定を保存します。各ページで初期値として使用されます。
          </DialogDescription>
        </DialogHeader>

        {!isLoaded ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : (
          <div className="space-y-6">
            {/* ランク設定 */}
            <div className="space-y-3">
              <Label htmlFor="rank">睡眠リサーチランク</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="rank"
                  type="number"
                  min={1}
                  max={60}
                  placeholder="1-60"
                  value={settings.rank ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      handleRankChange(null);
                    } else {
                      const num = Number.parseInt(value, 10);
                      if (!Number.isNaN(num) && num >= 1 && num <= 60) {
                        handleRankChange(num);
                      }
                    }
                  }}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  {settings.rank === null
                    ? "未設定"
                    : `ランク ${settings.rank}`}
                </span>
              </div>
            </div>

            {/* 鍋容量設定 */}
            <div className="space-y-3">
              <Label htmlFor="pot-capacity">デフォルト鍋容量</Label>
              <select
                id="pot-capacity"
                value={settings.potCapacity ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handlePotCapacityChange(value === "" ? null : Number(value));
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">未設定</option>
                {POT_CAPACITY_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label} ({preset.value})
                  </option>
                ))}
              </select>
            </div>

            {/* リセットボタン */}
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                設定をリセット
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
