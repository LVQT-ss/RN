import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { router } from "expo-router";

// Mock data for the last 7 days
const mockData = {
  dailyStats: [
    { date: "2024-02-03", revenue: 1250000, orders: 25, avgOrderValue: 50000 },
    { date: "2024-02-04", revenue: 2100000, orders: 42, avgOrderValue: 50000 },
    { date: "2024-02-05", revenue: 1800000, orders: 36, avgOrderValue: 50000 },
    { date: "2024-02-06", revenue: 2300000, orders: 46, avgOrderValue: 50000 },
    { date: "2024-02-07", revenue: 1950000, orders: 39, avgOrderValue: 50000 },
    { date: "2024-02-08", revenue: 2800000, orders: 56, avgOrderValue: 50000 },
    { date: "2024-02-09", revenue: 2500000, orders: 50, avgOrderValue: 50000 },
  ],
};

const StatisticsScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const revenueData = {
    labels: mockData.dailyStats.map((item) => item.date.slice(-2)),
    datasets: [
      {
        data: mockData.dailyStats.map((item) => item.revenue / 1000000),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const ordersData = {
    labels: mockData.dailyStats.map((item) => item.date.slice(-2)),
    datasets: [
      {
        data: mockData.dailyStats.map((item) => item.orders),
      },
    ],
  };

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫";
  };

  return (
    <View style={styles.wrapper}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.backButtonText}>← Về trang chủ</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Doanh thu hôm nay</Text>
            <Text style={styles.cardValue}>
              {formatMoney(mockData.dailyStats[6].revenue)}
            </Text>
            <Text style={styles.cardSubtext}>+12% so với hôm qua</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Số đơn hôm nay</Text>
            <Text style={styles.cardValue}>
              {mockData.dailyStats[6].orders}
            </Text>
            <Text style={styles.cardSubtext}>+8% so với hôm qua</Text>
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            Biểu đồ doanh thu 7 ngày (Triệu đồng)
          </Text>
          <LineChart
            data={revenueData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Orders Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Biểu đồ số đơn hàng 7 ngày</Text>
          <BarChart
            data={ordersData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        {/* Daily Statistics Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Thống kê chi tiết theo ngày</Text>
          {mockData.dailyStats
            .slice()
            .reverse()
            .map((day, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableDate}>{day.date}</Text>
                <View style={styles.tableStats}>
                  <Text style={styles.tableRevenue}>
                    {formatMoney(day.revenue)}
                  </Text>
                  <Text style={styles.tableOrders}>{day.orders} đơn</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButtonText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
  container: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: "#22c55e",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  tableContainer: {
    backgroundColor: "#ffffff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tableDate: {
    fontSize: 14,
    color: "#666",
  },
  tableStats: {
    alignItems: "flex-end",
  },
  tableRevenue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  tableOrders: {
    fontSize: 12,
    color: "#666",
  },
});

export default StatisticsScreen;
