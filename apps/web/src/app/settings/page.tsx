import type { Metadata } from "next";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { SettingsForm } from "@/components/settings/settings-form";

export const metadata: Metadata = {
  title: "設定 | ポケモンスリープ攻略サイト",
  description: "デフォルトのランクや鍋容量などの設定を保存できます。",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "設定" }]} />

      <h1 className="text-4xl font-bold mb-4">設定</h1>
      <p className="text-gray-600 mb-8">
        デフォルトの設定を保存します。ここで設定した値は各ページで初期値として使用されます。
      </p>

      <SettingsForm />
    </div>
  );
}
